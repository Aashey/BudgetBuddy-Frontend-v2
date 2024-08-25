import { Button, Form, Input, message, Modal, Typography } from "antd";
import { useState } from "react";
import { usePasswordChange } from "../../services/password/usePasswordChange";

const ChangePassword = () => {
  const { Link, Title, Text } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: ChangePassword, isLoading } = usePasswordChange();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    ChangePassword(
      {
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      },
      {
        onSuccess: () => {
          message.success("Password changed successfully.");
          closeModal();
        },
        onError: (error) => {
          message.error(error || "Failed to change password.");
        },
      }
    );
  };

  return (
    <>
      <Link onClick={openModal}>Change Password</Link>
      <Modal
        width={"40vw"}
        title="Change Password"
        footer={false}
        open={isModalOpen}
        onClose={closeModal}
        onCancel={closeModal}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            className="mt-4"
            label="Current Password"
            name="current_password"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="new_password"
            label={
              <Text className="text-gray-600" strong>
                Password
              </Text>
            }
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
            validateDebounce="1000"
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="new_password_confirmation"
            label={
              <Text className="text-gray-600" strong>
                Confirm Password
              </Text>
            }
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Password confirmation is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            validateDebounce="1000"
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
