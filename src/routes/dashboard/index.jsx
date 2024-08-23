import { Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-public";
import Dashboard from "../../components/dashboard";

export const dashboardRoutes = (
  <Route>
    <Route
      path="/dashboard"
      element={<ProtectedRoute element={<Dashboard />} />}
    />
  </Route>
);
