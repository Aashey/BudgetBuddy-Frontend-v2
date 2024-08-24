import { Card, message, Table } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActionGroup from "../../actiongroup/index";
import { useSavingTransaction } from "../../../services/transaction/saving/useSavingTransaction";
import TitleHeader from "../../ui/title-header/titleheader";

import ColumnMenu from "../../ui/column-menu/column-menu";
import ExcelExport from "../../excel-exporter";

import { formatDate, getThisMonth } from "../../../utils/helper";
import FilterDate from "../../ui/filter";
import TransactionSetupForm from "../transaction-setup-form/transaction-setup-form";
import { useDeleteSavingTransaction } from "../../../services/transaction/saving/useSavingTransaction";
import SavingGoal from "./saving-goal";

const SavingTransaction = () => {
  const [filter, setFilter] = useState(getThisMonth());

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const savingTransactionColumn = [
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

  const { data, isLoading, refetch, error } = useSavingTransaction(filter);
  const deleteSavingTransaction = useDeleteSavingTransaction();

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
  const defaultCheckedList = savingTransactionColumn.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const columnOptions = savingTransactionColumn.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = savingTransactionColumn.map((item) => ({
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
    deleteSavingTransaction.mutate(
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
          type: "saving",
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
          <SavingGoal />
          <ExcelExport
            fileName="saving_transaction"
            error={error}
            columnName={savingTransactionColumn}
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
        type="saving"
        mode={mode}
        onClose={closeDrawer}
        isDrawerOpen={isDrawerOpen}
        refetch={refetch}
        record={selectedRecord}
      />
    </>
  );
};

export default SavingTransaction;
