import { Switch } from "antd";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <span>
      <Switch
        size="medium"
        onChange={handleToggleTheme}
        checked={mode == "dark"}
        checkedChildren="dark"
        unCheckedChildren="light"
      />
    </span>
  );
};

export default ThemeToggler;
