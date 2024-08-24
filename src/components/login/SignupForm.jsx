import {
  Button,
  Card,
  Form,
  Input,
  message,
  notification,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../services/signup/useRegister";

const SignupForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Title, Text, Link } = Typography;
  const { mode } = useSelector((state) => state.theme);
  const { mutate: registerMutation, isLoading } = useRegisterUser();

  const onFinish = (values) => {
    const { username, email, password, password_confirmation } = values;
    registerMutation(
      { username, email, password, password_confirmation },
      {
        onSuccess: () => {
          message.success("User Registered successfully.");
          navigate("/login");
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Registration Failed."
          );
        },
      }
    );
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col  p-2">
        <div className="flex justify-between items-center mb-6">
          <span className="flex items-center">
            <Title level={2}>Budget Buddy</Title>
          </span>
          <Text>
            Already have an account ?{" "}
            <NavLink to="/login">
              <Link>Login</Link>
            </NavLink>
          </Text>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="p-2 w-full max-w-md">
            <Title level={2}>Signup</Title>
            <Text className="text-gray-600">Create your free account</Text>

            <Form
              onFinish={onFinish}
              form={form}
              className="mt-4 w-full"
              layout="vertical"
            >
              <Form.Item
                name="username"
                label={
                  <Text className="text-gray-600" strong>
                    Username
                  </Text>
                }
                rules={[
                  { required: true, message: "Username is required" },
                  {
                    pattern: /\d/, // Regular expression to check for a number
                    message: "Username must include at least one number",
                  },
                ]}
                validateDebounce="1000"
              >
                <Input
                  count={{ show: true }}
                  placeholder="Username"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={
                  <Text className="text-gray-600" strong>
                    Email Address
                  </Text>
                }
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
                validateDebounce="1000"
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
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
                name="password_confirmation"
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
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
                validateDebounce="1000"
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Sign Up
              </Button>
            </Form>
          </Card>
        </div>
      </div>
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-evenly "
        style={{ backgroundColor: mode === "light" ? "#e4eaf7" : "#202131" }}
      >
        <img
          src="budgetlogo.png"
          alt="Login Illustration"
          className="size-2/3 object-cover"
        />
        <Title level={2} className="p-4">
          One stop solution to manage all your budgets.
        </Title>
      </div>
    </div>

    // <div className="flex items-center justify-center min-h-screen bg-purple-200">
    //   {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl bg-red-200"> */}
    //   <div className="bg-green-200 flex items-center justify-center p-6 md:p-12 lg:p-16 ">
    //     <Card className="w-full max-w-md p-8 bg-transparent border-0">
    //       <Title className="text-2xl font-bold mb-6 ">Login</Title>
    //
    //     </Card>
    //   </div>
    //   {/* Image Section */}
    //   <div className="hidden md:flex items-center justify-center p-6 lg:p-12">
    //     <img
    //       src="login.jpg"
    //       alt="Login Illustration"
    //       className="md:w-[800px] object-cover"
    //     />
    //     {/* </div> */}
    //   </div>
    // </div>
  );
};

export default SignupForm;
