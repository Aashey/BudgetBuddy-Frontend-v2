import { Button, notification, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authActions";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, expirationTime, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      notification.success({
        message: "Logout Successful.",
        description: "You have been logged out successfully.",
      });
      if (error) {
        notification.error({
          message: "Logout Failed.",
          description: error || "An error occured.",
        });
      }
    }
  }, [isAuthenticated, error]);

  return (
    <>
      <Button onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
