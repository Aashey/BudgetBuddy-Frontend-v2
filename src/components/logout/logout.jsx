import { message, notification, Typography } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLogout } from "../../features/auth/authAct";

const Logout = () => {
  const { Link } = Typography;
  const { mutate: logout, isLoading } = useLogout();
  const { isAuthenticated, expirationTime } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      message.success("Logout Successful.");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Link onClick={handleLogout} loading={isLoading}>
        Logout
      </Link>
    </>
  );
};

export default Logout;
