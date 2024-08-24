import { Card, message, notification, Switch, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import TitleHeader from "../ui/title-header/titleheader";

import ColumnMenu from "../ui/column-menu/column-menu";
import ExcelExport from "../excel-exporter/index";
import { CustomSearchWithTransaction } from "../search/custom-search";
import { formatDate, getThisMonth } from "../../utils/helper";
import FilterDate from "../ui/filter/index";
import { useGetTransaction } from "../../services/transaction/useTransactionHistory";

const TransactionHistory = () => {
  const [filter, setFilter] = useState(getThisMonth());

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const tagColor = {
    Income: "#3498db",
    Expense: "#e74c3c",
    Saving: "#f39c12",
    Withdraw: "#8854d0",
  };

  const transactionHistoryColumn = [
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
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return formatDate(text);
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      render: (text) => {
        return (
          <Tag
            className="size-6 text-white w-[60px] flex justify-center items-center"
            style={{
              backgroundColor: tagColor[text],
            }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const { data, isLoading, refetch, error } = useGetTransaction(filter);

  const { mode: theme } = useSelector((state) => state.theme);

  const [filteredData, setFilteredData] = useState();

  const defaultCheckedList = transactionHistoryColumn.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const columnOptions = transactionHistoryColumn.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = transactionHistoryColumn.map((item) => ({
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

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  return (
    <>
      {/* Top Section  */}
      <TitleHeader
        headerProps={{
          type: "transaction",
          method: "history",
          setFilter,
        }}
      />

      {/* Mid Section  */}

      <span className="flex justify-between items-center mt-4 mb-4">
        <span className="flex justify-between gap-4">
          <CustomSearchWithTransaction
            data={data}
            setFilteredData={setFilteredData}
            searchName={"title"}
          />
          <FilterDate setFilter={setFilter} />
        </span>

        <span className="flex justify-between items-center gap-4">
          <ExcelExport
            fileName="transaction_history"
            error={error}
            columnName={transactionHistoryColumn}
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
          dataSource={!error ? filteredData ?? data?.data : []}
          columns={newColumns}
        />
      </Card>
    </>
  );
};

export default TransactionHistory;
