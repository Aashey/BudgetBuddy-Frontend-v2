import { Card, message, notification, Switch, Table } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActionGroup from "../../actiongroup/index";
import {
  useDeleteIncomeTransaction,
  useIncomeTransaction,
} from "../../../services/transaction/income/useIncomeTransaction";
import TitleHeader from "../../ui/title-header/titleheader";

import ColumnMenu from "../../ui/column-menu/column-menu";
import ExcelExport from "../../excel-exporter";
import { CustomSearchWithCategory } from "../../search/custom-search";
import { formatDate, getThisMonth } from "../../../utils/helper";
import FilterDate from "../../ui/filter";
import TransactionSetupForm from "../transaction-setup-form/transaction-setup-form";

const IncomeTransaction = () => {
  const [filter, setFilter] = useState(getThisMonth());

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const incomeTransactionColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 50,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Category",
      dataIndex: "category_title",
      key: "category_title",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "date_received",
      key: "date_received",
      render: (text) => {
        return <>{formatDate(text)}</>;
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
      width: 300,
    },
    {
      title: "Recurring",
      dataIndex: "is_recurring",
      key: "is_recurring",
      render: (isActive) => <Switch size="small" value={isActive} />,
      width: 100,
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

  const { data, isLoading, refetch, error } = useIncomeTransaction(filter);
  const deleteIncomeTransaction = useDeleteIncomeTransaction();

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
  const defaultCheckedList = incomeTransactionColumn.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const columnOptions = incomeTransactionColumn.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = incomeTransactionColumn.map((item) => ({
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
    deleteIncomeTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          notification.success({
            message: "Deleted Successfully.",
            description: "Transaction deleted successfully.",
          });
          refetch();
        },
        onError: () => {
          notification.success({
            message: "Failed to deleted.",
            description: "Failed to delete transaction.",
          });
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
          type: "income",
          method: "transaction",
          setMode,
          openDrawer,
          setFilter,
        }}
      />

      {/* Mid Section  */}

      <span className="flex justify-between items-center mt-4 mb-4">
        <span className="flex justify-between gap-4">
          <CustomSearchWithCategory
            data={data}
            setFilteredData={setFilteredData}
            searchName={"title"}
          />
          <FilterDate setFilter={setFilter} />
        </span>

        <span className="flex justify-between items-center gap-4">
          <ExcelExport
            fileName="income_transaction"
            error={error}
            columnName={incomeTransactionColumn}
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
        type="income"
        mode={mode}
        onClose={closeDrawer}
        isDrawerOpen={isDrawerOpen}
        refetch={refetch}
        record={selectedRecord}
      />
    </>
  );
};

export default IncomeTransaction;
