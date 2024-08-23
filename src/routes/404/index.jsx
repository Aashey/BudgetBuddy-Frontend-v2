import Title from "antd/es/typography/Title";
import { Route } from "react-router-dom";

export const NotFoundRoute = (
  <Route>
    <Route path="*" element={<Title>Page Not Found</Title>} />
  </Route>
);
