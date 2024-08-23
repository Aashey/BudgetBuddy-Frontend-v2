import { Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-public";
import {
  ExpenseTransaction,
  IncomeTransaction,
  SavingTransaction,
  TransactionHistory,
  WithdrawTransaction,
} from "../../components/transaction";

export const TransactionRoutes = (
  <Route>
    <Route
      path="/transaction"
      element={<ProtectedRoute element={<TransactionHistory />} />}
    />
    <Route
      path="/transaction/income"
      element={<ProtectedRoute element={<IncomeTransaction />} />}
    />
    <Route
      path="/transaction/expense"
      element={<ProtectedRoute element={<ExpenseTransaction />} />}
    />
    <Route
      path="/transaction/saving"
      element={<ProtectedRoute element={<SavingTransaction />} />}
    />
    <Route
      path="/transaction/withdraw"
      element={<ProtectedRoute element={<WithdrawTransaction />} />}
    />
  </Route>
);
