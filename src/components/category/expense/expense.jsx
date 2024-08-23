import { Button, Card, Input, Switch, Table, Typography } from "antd";
// import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { CategorySetupForm } from "../index";
import { useState } from "react";
// import ActionGroup from "../../actiongroup";
import { useExpenseCategory } from "../../../services/category/expense/useExpenseCategory";
import TitleHeader from "../../ui/title-header/titleheader";

const ExpenseCategory = () => {
  // const [filter, setFilter] = useState("");
  const { data, isLoading, refetch, error } = useExpenseCategory();

  const { mode: theme } = useSelector((state) => state.theme);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("create");

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const expenseCategoryColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 50,
      //   render: (text, record, index) => {
      //     const { current, pageSize } = tablePagination;
      //     return (current - 1) * pageSize + index + 1;
      //   },
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
    // {
    //   title: "Action",
    //   render: (record) => (
    //     <ActionGroup
    //       record={record}
    //       //   handleEditComponent={handleEditComponent}
    //       //   handleDelete={handleDelete}
    //       //   handleViewComponent={handleViewComponent}
    //       method="category"
    //     />
    //   ),
    //   width: 100,
    //   align: "center",
    // },
  ];

  return (
    <>
      <TitleHeader
        headerProps={{
          type: "expense",
          method: "category",
          setMode,
          openDrawer,
        }}
      />
      <span className="flex justify-between items-center mt-4 mb-4">
        <Input
          prefix={<CiSearch />}
          type="search"
          className="w-[200px]"
          placeholder="Search"
        />
        <Button icon={<CiExport size={18} />}>Excel</Button>
      </span>
      <Card className="shadow-md">
        <Table
          loading={isLoading}
          dataSource={!error ? data?.data?.data : []}
          columns={expenseCategoryColumn}
        />
      </Card>

      <CategorySetupForm
        type="Expense"
        mode={mode}
        onClose={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </>
  );
};

export default ExpenseCategory;
