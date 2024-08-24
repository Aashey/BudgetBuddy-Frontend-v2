import { Button, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";

const ChangePassword = () => {
  const { Link, Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
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
        <Form layout="vertical">
          <Form.Item
            className="mt-4"
            label="Current Password"
            name="current_password"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Enter your current password." },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            rules={[
              { required: true, message: "Enter your current password." },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Change Password</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
