import { Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-public";
import { IncomeCategory, ExpenseCategory } from "../../components/category";

export const CategoryRoutes = (
  <Route>
    <Route
      path="/category/income-category"
      element={<ProtectedRoute element={<IncomeCategory />} />}
    />
    <Route
      path="/category/expense-category"
      element={<ProtectedRoute element={<ExpenseCategory />} />}
    />
  </Route>
);
