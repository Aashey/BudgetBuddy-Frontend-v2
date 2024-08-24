import { Button, Input, Form, Card, message } from "antd";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "../../services/profile/useUserProfile";
import { useEffect } from "react";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { data, isLoading, isError, refetch } = useGetUserProfile();
  const { mutate: updateProfile, isLoading: isProfileLoading } =
    useUpdateUserProfile();
  console.log(data?.data?.data);
  const userData = data?.data?.data || [];
  const onFinish = (values) => {
    updateProfile(values, {
      onSuccess: () => {
        message.success("Profile updated successfully.");
        refetch();
      },
      onError: (error) => {
        message.error(error || "Failed to update profile.");
      },
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(userData);
    }
  }, [data]);
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Card className="max-w-4xl mx-auto gap-8 p-6 rounded-lg shadow-md">
          <span className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            <Form.Item>
              <Button
                loading={isProfileLoading}
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                Submit
              </Button>
            </Form.Item>
          </span>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Username" name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="First Name" name="first_name">
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item label="Middle Name" name="middle_name">
              <Input placeholder="Enter your middle name" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Last Name" name="last_name">
              <Input placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone_number">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter your address" />
            </Form.Item>
          </div>
        </Card>
      </Form>
    </>
  );
};

export default UserProfile;
