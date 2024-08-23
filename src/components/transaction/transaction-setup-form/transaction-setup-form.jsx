import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";

import { capitalizeInitialChar } from "../../../utils/helper";
import dayjs from "dayjs";
import useCategoryData from "../../../services/category/useCategoryData";
import { customMutation } from "../../../services/customMutation";

// import FormDebug from "../../helper/FormDebug";
import { useGetTotalData } from "../../../services/dashboard/useTotalData";
import { disableAfterToday_AndPrevMonth } from "../../../utils/helper";
import { useSelector } from "react-redux";
import {
  useCreateIncomeTransaction,
  useUpdateIncomeTransaction,
} from "../../../services/transaction/income/useIncomeTransaction";
import {
  useCreateExpenseTransaction,
  useUpdateExpenseTransaction,
} from "../../../services/transaction/expense/useExpenseTransaction";
import {
  useCreateSavingTransaction,
  useUpdateSavingTransaction,
} from "../../../services/transaction/saving/useSavingTransaction";
import {
  useCreateWithdrawTransaction,
  useUpdateWithdrawTransaction,
} from "../../../services/transaction/withdraw/useWithdrawTransaction";

const TransactionSetupForm = ({
  isDrawerOpen,
  onClose,
  type,
  refetch,
  mode,
  record = {},
}) => {
  const { mode: theme } = useSelector((state) => state.theme);
  const [form] = Form.useForm();
  const { Text } = Typography;
  const { data: totalData, refetch: refetchTotalData } = useGetTotalData();
  const createIncomeTransaction = useCreateIncomeTransaction();
  const createExpenseTransaction = useCreateExpenseTransaction();
  const createSavingTransaction = useCreateSavingTransaction();
  const createWithdrawTransaction = useCreateWithdrawTransaction();
  const updateIncomeTransaction = useUpdateIncomeTransaction();
  const updateExpenseTransaction = useUpdateExpenseTransaction();
  const updateSavingTransaction = useUpdateSavingTransaction();
  const updateWithdrawTransaction = useUpdateWithdrawTransaction();
  const [loading, setLoading] = useState(false);

  const { data, error, isLoading } = useCategoryData("category", type);

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (error && (type === "income" || type === "expense")) {
      message.error("Failed to load categories!");
    }
    const updatedData = data?.data?.data?.map((data) => ({
      value: data.id,
      label: data.title,
    }));
    setCategoryData(updatedData);
  }, [data, error]);

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    refetch().finally(() => {
      message.success(`Transaction ${action} successfully!`);
      onClose();
      form.resetFields();
      setLoading(false);
    });
    refetchTotalData();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} transaction!`);
    setLoading(false);
  };

  const OnFinish = (values) => {
    setLoading(true);
    const transactionMap = {
      income: {
        create: createIncomeTransaction,
        update: updateIncomeTransaction,
      },
      expense: {
        create: createExpenseTransaction,
        update: updateExpenseTransaction,
      },
      saving: {
        create: createSavingTransaction,
        update: updateSavingTransaction,
      },
      withdraw: {
        create: createWithdrawTransaction,
        update: updateWithdrawTransaction,
      },
    };

    const dataKeys = {
      income: "date_received",
      expense: "date_spent",
    };

    const currentTransaction = transactionMap[type][mode];
    const dataKey = dataKeys[type] || null;

    const reformattedDate =
      values.date == (undefined || null)
        ? null
        : dayjs(values.date).format("YYYY-MM-DD");

    delete values.date;

    const createPayload = {
      income: {
        ...values,
        [dataKey]: reformattedDate,
      },
      expense: {
        ...values,
        [dataKey]: reformattedDate,
      },
      saving: values,
      withdraw: values,
    };

    const updatePayload = { ...createPayload[type], id: record.id };
    const payload = mode === "create" ? createPayload[type] : updatePayload;

    customMutation(
      currentTransaction,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if (!loading) {
      if (mode == "update" || mode == "view") {
        form.setFieldsValue({
          ...record,
          date:
            type === "income"
              ? dayjs(record.date_received)
              : dayjs(record.date_spent),
        });
      } else {
        form.resetFields();
      }
    }
  }, [mode, record, form]);

  return (
    <>
      <Drawer
        style={{
          backgroundColor: `${theme === "light" ? "#ffffff" : "#202131"}`,
        }}
        title={
          mode !== "view"
            ? `${capitalizeInitialChar(mode)} ${capitalizeInitialChar(
                type
              )} Transaction`
            : `${capitalizeInitialChar(type)} Transaction`
        }
        width="30vw"
        open={isDrawerOpen}
        onClose={onClose}
      >
        <Form
          disabled={mode === "view"}
          layout="vertical"
          onFinish={OnFinish}
          form={form}
        >
          <div className="p-4">
            <div
              style={{
                backgroundColor: `${theme === "dark" ? "#202131" : "#ffffff"}`,
                color: `${theme === "dark" ? "#ffffff" : "#000000"}`,
              }}
              className="flex justify-between items-center mb-4 rounded-xl "
            >
              <Text>
                {type === "withdraw" ? (
                  <>
                    Total Saving:{" "}
                    <span className="font-bold">
                      {
                        totalData?.data?.financial_data?.current_month
                          ?.total_saving
                      }
                    </span>
                  </>
                ) : (
                  <>
                    Total Balance:{" "}
                    <span className="font-bold">
                      {totalData?.data?.financial_data?.current_month?.balance}
                    </span>
                  </>
                )}
              </Text>
              <Button
                onClick={() => form.resetFields()}
                type="none"
                className="bg-gray-600  hover:bg-gray-800 text-white"
                icon={<GrClearOption />}
              >
                Clear
              </Button>
            </div>

            {(type === "income" || type === "expense") && (
              <>
                <Form.Item
                  label={<Text strong>Category</Text>}
                  name="category_id"
                  rules={[
                    { required: true, message: "This field is required." },
                  ]}
                >
                  <Select
                    showSearch
                    loading={isLoading}
                    style={{ width: "100%" }}
                    placeholder="Select a category"
                    options={categoryData}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={<Text strong>Date</Text>}
                  name="date"
                  rules={[
                    {
                      required: mode === "update",
                      message: "This field is required.",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={disableAfterToday_AndPrevMonth}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="amount"
              label={<Text strong>Amount</Text>}
              rules={[{ required: true, message: "This field is required." }]}
            >
              <InputNumber
                min={1}
                max={10000000}
                addonBefore="Rs."
                style={{ width: "100%", color: "black" }}
                placeholder="Enter amount"
              />
            </Form.Item>
            <Form.Item name="notes" label={<Text strong>Notes</Text>}>
              <Input.TextArea
                rows={2}
                style={{ width: "100%", resize: "none" }}
                placeholder="Enter Notes"
              />
            </Form.Item>

            {(type === "income" || type === "expense") && (
              <Form.Item
                label={<Text strong>Is Recurring</Text>}
                name="is_recurring"
                initialValue={true}
              >
                <Switch size="small" />
              </Form.Item>
            )}

            {mode !== "view" && (
              <Form.Item>
                <Button
                  loading={loading}
                  block
                  className="w-[12rem] m-auto"
                  type="primary"
                  htmlType="submit"
                >
                  {mode === "update" ? "Update" : "Add"}
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default TransactionSetupForm;
