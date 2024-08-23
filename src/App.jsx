import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useSelector } from "react-redux";
import "./App.css";
import { lightToken, darkToken } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const customTheme = {
    algorithm:
      mode === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
    token: mode === "light" ? lightToken : darkToken,
    components: mode === "light" ? lightToken.components : darkToken.components,
  };

  const bgStyle = {
    backgroundColor: mode === "light" ? "#ecf0f1" : "#181925",
  };

  const queryClient = new QueryClient();
  return (
    <>
      <ConfigProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <div style={bgStyle}>
            <RouterProvider router={routes} />
          </div>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
