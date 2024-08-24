import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  message,
  Select,
  Switch,
  Table,
} from "antd";
import { useSelector } from "react-redux";
import { CategorySetupForm } from "../index";
import { useEffect, useState } from "react";
import ActionGroup from "../../actiongroup/index";
import { useIncomeCategory } from "../../../services/category/income/useIncomeCategory";
import TitleHeader from "../../ui/title-header/titleheader";

import ColumnMenu from "../../ui/column-menu/column-menu";
import ExcelExport from "../../excel-exporter";
import { CustomSearchWithTitle } from "../../search/custom-search";
import { TbSettingsSearch } from "react-icons/tb";
import dayjs from "dayjs";
import {
  disableAfterToday,
  getThisMonth,
  getThisWeek,
  getToday,
} from "../../../utils/helper";
import FilterDate from "../../ui/filter";

const IncomeCategory = () => {
  const [filter, setFilter] = useState(getThisMonth());

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const incomeCategoryColumn = [
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          method="category"
        />
      ),
      width: 100,
      align: "center",
    },
  ];

  const { data, isLoading, refetch, error } = useIncomeCategory(filter);

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
  const defaultCheckedList = incomeCategoryColumn.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const columnOptions = incomeCategoryColumn.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = incomeCategoryColumn.map((item) => ({
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
  const handleDelete = () => {
    setMode("delete");
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
          method: "category",
          setMode,
          openDrawer,
          setFilter,
        }}
      />

      {/* Mid Section  */}

      <span className="flex justify-between items-center mt-4 mb-4">
        <span className="flex justify-between gap-4">
          <CustomSearchWithTitle
            data={data}
            setFilteredData={setFilteredData}
            searchName={"title"}
          />
          {/* <FilterDate setFilter={setFilter} /> */}
        </span>

        <span className="flex justify-between items-center gap-4">
          <ExcelExport
            fileName="income_category"
            error={error}
            columnName={incomeCategoryColumn}
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
      <CategorySetupForm
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

export default IncomeCategory;
