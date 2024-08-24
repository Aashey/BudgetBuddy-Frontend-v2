import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Switch,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { capitalizeInitialChar } from "../../../utils/helper";
import {
  useCreateIncomeCategory,
  useUpdateIncomeCategory,
} from "../../../services/category/income/useIncomeCategory";
import {
  useCreateExpenseCategory,
  useUpdateExpenseCategory,
} from "../../../services/category/expense/useExpenseCategory";
import { useEffect, useState } from "react";
import { customMutation } from "../../../services/customMutation";

const CategorySetupForm = ({
  isDrawerOpen,
  onClose,
  mode,
  type,
  record = {},
  refetch,
}) => {
  const createIncomeCategory = useCreateIncomeCategory();
  const updateIncomeCategory = useUpdateIncomeCategory();
  const createExpenseCategory = useCreateExpenseCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const { mode: theme } = useSelector((state) => state.theme);
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    refetch().finally(() => {
      message.success(`Category ${action} successfully!`);
      onClose();
      form.resetFields();
      setLoading(false);
    });
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} category!`);
    setLoading(false);
  };

  const OnFinish = (values) => {
    setLoading(true);
    const categoryMap = {
      income: {
        create: createIncomeCategory,
        update: updateIncomeCategory,
      },
      expense: {
        create: createExpenseCategory,
        update: updateExpenseCategory,
      },
    };

    const currentCategory = categoryMap[type][mode];

    const payload = mode === "create" ? values : { ...values, id: record.id };

    customMutation(
      currentCategory,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if (!loading) {
      if ((mode == "update" || mode == "view") && record) {
        form.setFieldsValue(record);
      } else {
        form.resetFields();
      }
    }
  }, [mode, record, form]);
  return (
    <div>
      <Drawer
        style={{
          backgroundColor: `${theme === "light" ? "#ffffff" : "#202131"}`,
        }}
        title={
          mode !== "view"
            ? `${capitalizeInitialChar(mode)} ${capitalizeInitialChar(
                type
              )} Category`
            : `${capitalizeInitialChar(type)} Category`
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
          {/* <FormDebug form={form} /> */}
          <div className="p-4">
            <Form.Item
              name="title"
              label={<Text className="font-bold">Title</Text>}
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input
                placeholder="Title"
                disabled={mode === "update" || mode === "view"}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={<Text className="font-bold">Description</Text>}
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input.TextArea
                rows={2}
                style={{ resize: "none" }}
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item
              label={<Text className="font-bold">Active</Text>}
              name="status"
              initialValue={true}
            >
              <Switch size="medium" />
            </Form.Item>

            {mode !== "view" && (
              <Form.Item>
                <Button
                  loading={loading}
                  block
                  type="primary"
                  htmlType="submit"
                >
                  {mode === "update" ? "Update Category" : "Add Category"}
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default CategorySetupForm;
