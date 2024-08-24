import { Card, message, Switch, Table } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActionGroup from "../../actiongroup/index";
import TitleHeader from "../../ui/title-header/titleheader";

import ColumnMenu from "../../ui/column-menu/column-menu";
import ExcelExport from "../../excel-exporter";
import { formatDate, getThisMonth } from "../../../utils/helper";
import FilterDate from "../../ui/filter";
import TransactionSetupForm from "../transaction-setup-form/transaction-setup-form";
import {
  useDeleteWithdrawTransaction,
  useWithdrawTransaction,
} from "../../../services/transaction/withdraw/useWithdrawTransaction";

const WithdrawTransaction = () => {
  const [filter, setFilter] = useState(getThisMonth());

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const withdrawTransactionColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 80,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return formatDate(date);
      },
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 200,
    },
    {
      title: "Action",
      render: (record) => (
        <ActionGroup
          record={record}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          handleViewComponent={handleViewComponent}
          method="transaction"
        />
      ),
      width: 100,
      align: "center",
    },
  ];

  const { data, isLoading, refetch, error } = useWithdrawTransaction(filter);
  const deleteWithdrawTransaction = useDeleteWithdrawTransaction();

  const { mode: theme } = useSelector((state) => state.theme);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("create");

  const [filteredData, setFilteredData] = useState();
  const [selectedRecord, setSelectedRecord] = useState();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const defaultCheckedList = withdrawTransactionColumn.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const columnOptions = withdrawTransactionColumn.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = withdrawTransactionColumn.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  const handleTableChange = (pagination) => {
    setTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleMenuClick = ({ key }) => {
    setCheckedList((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  const handleEditComponent = (record) => {
    setMode("update");
    setSelectedRecord(record);
    openDrawer();
  };
  const handleViewComponent = (record) => {
    setMode("view");
    setSelectedRecord(record);
    openDrawer();
  };
  const handleDelete = (record) => {
    const id = record.id;
    deleteWithdrawTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Transaction deleted successfully!");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete transaction!");
        },
      }
    );
  };

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  return (
    <>
      {/* Top Section  */}
      <TitleHeader
        headerProps={{
          type: "withdraw",
          method: "transaction",
          setMode,
          openDrawer,
          setFilter,
        }}
      />

      {/* Mid Section  */}

      <span className="flex justify-between items-center mt-4 mb-4">
        <span className="flex justify-between gap-4">
          <FilterDate setFilter={setFilter} />
        </span>

        <span className="flex justify-between items-center gap-4">
          <ExcelExport
            fileName="withdraw_transaction"
            error={error}
            columnName={withdrawTransactionColumn}
            checkedList={checkedList}
            filteredData={filteredData}
            data={data}
          />

          <ColumnMenu
            checkedList={checkedList}
            handleMenuClick={handleMenuClick}
            columnOptions={columnOptions}
          />
        </span>
      </span>

      {/* Lower Section with table  */}
      <Card className="shadow-md mb-4">
        <Table
          className="mt-2"
          onChange={handleTableChange}
          loading={isLoading}
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
          }}
          scroll={{
            y: 280,
          }}
          dataSource={!error ? filteredData ?? data?.data?.data : []}
          columns={newColumns}
        />
      </Card>

      {/* Drawer  */}
      <TransactionSetupForm
        type="withdraw"
        mode={mode}
        onClose={closeDrawer}
        isDrawerOpen={isDrawerOpen}
        refetch={refetch}
        record={selectedRecord}
      />
    </>
  );
};

export default WithdrawTransaction;
