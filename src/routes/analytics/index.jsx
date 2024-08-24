import { Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-public";
import {
  BalanceAnalytics,
  CashflowAnalytics,
  CashMovementAnalytics,
} from "../../components/analytics";

export const AnalyticsRoutes = (
  <Route>
    <Route
      path="/analytics/balance"
      element={<ProtectedRoute element={<BalanceAnalytics />} />}
    />
    <Route
      path="/analytics/cashflow"
      element={<ProtectedRoute element={<CashflowAnalytics />} />}
    />
    <Route
      path="/analytics/cash-movement"
      element={<ProtectedRoute element={<CashMovementAnalytics />} />}
    />
  </Route>
);
