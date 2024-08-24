import {
  Button,
  Card,
  Form,
  Input,
  message,
  notification,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Title, Text, Link } = Typography;
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const { mode } = useSelector((state) => state.theme);

  const onFinish = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
      notification.success({
        message: "Login Successful.",
        description: "You have been logged in successfully.",
      });
    }
    if (error) {
      notification.error({
        message: "Login Failed.",
        description: error,
      });
    }
  }, [isAuthenticated, error]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col p-2">
        <div className="flex justify-between items-center mb-6">
          <span className="flex items-center">
            <Title level={2}>Budget Buddy</Title>
          </span>
          <Text>
            Don't have an account yet?{" "}
            <NavLink to="/signup">
              <Link>Signup</Link>
            </NavLink>
          </Text>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="p-2 w-full max-w-md">
            <Title level={2}>LOGIN</Title>
            <Text>Login to manage your budget</Text>

            <Form
              onFinish={onFinish}
              form={form}
              className="mt-11 mb-4 w-full"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label={
                  <Text className="text-gray-600" strong>
                    Email
                  </Text>
                }
                rules={[
                  { required: true, message: "Email is required" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
                validateDebounce="1000"
              >
                <Input placeholder="Email" className="w-full" />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <Text className="text-gray-600" strong>
                    Password
                  </Text>
                }
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long",
                  },
                ]}
                validateDebounce="1000"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Button block type="primary" htmlType="submit" loading={loading}>
                Login
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

export default LoginForm;
