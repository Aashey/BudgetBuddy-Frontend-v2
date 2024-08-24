import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import {
  useCreateSavingGoal,
  useDeleteSavingGoal,
  useSavingGoal,
} from "../../../services/transaction/saving/useSavingGoal";
import { useEffect, useState } from "react";
import { TbMoneybag } from "react-icons/tb";

const SavingGoal = () => {
  const { data, loading, error, refetch } = useSavingGoal();
  const { mutate: deleteGoal, isLoading: deleteLoading } =
    useDeleteSavingGoal();
  const { mutate: createSavingGoal, isLoading: createLoading } =
    useCreateSavingGoal();
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const savingGoalExists = data?.data?.data.length > 0;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [goalId, setGoalId] = useState(null);
  useEffect(() => {
    if (savingGoalExists) {
      const goalData = data?.data?.data[0];
      const targetAmount = goalData?.target_amount || 0;
      setGoalId(goalData?.id);
      form.setFieldsValue({ target_amount: targetAmount });
    } else {
      form.resetFields();
    }
  }, [data, form, savingGoalExists]);

  const handleFinish = (values) => {
    createSavingGoal(
      { target_amount: values.target_amount },
      {
        onSuccess: () => {
          message.success("Saving goal added successfully.");
          refetch();
          closeModal();
        },
        onError: () => {
          message.error("Failed to add saving goal.");
        },
      }
    );
  };

  const handleDelete = () => {
    if (goalId) {
      deleteGoal(goalId, {
        onSuccess: () => {
          message.success("Goal deleted successfully.");
          refetch();
          form.resetFields();
          closeModal();
        },
        onError: (error) => {
          message.error(error || "Failed to delete goal.");
        },
      });
    }
  };
  return (
    <>
      <Button icon={<TbMoneybag size={20} />} onClick={openModal}>
        Saving Goal
      </Button>
      <Modal
        width={"30vw"}
        title="Saving Goal"
        footer={false}
        open={isModalOpen}
        onClose={closeModal}
        onCancel={closeModal}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            rules={[{ required: true, message: "Target is required." }]}
            label={<Text className="font-semibold">Target</Text>}
            name="target_amount"
          >
            <InputNumber disabled={savingGoalExists} className="w-[100%]" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                loading={createLoading}
                disabled={savingGoalExists}
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Add Target
              </Button>
            </Col>
            <Col span={12}>
              <Button
                loading={deleteLoading}
                onClick={handleDelete}
                disabled={!savingGoalExists}
                style={{ width: "100%" }}
              >
                Delete Target
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default SavingGoal;
