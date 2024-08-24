import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { loginRoutes } from "./login";
import { dashboardRoutes } from "./dashboard";
import { NotFoundRoute } from "./404";
import CustomLayout from "../layout";
import { CategoryRoutes } from "./category";
import { TransactionRoutes } from "./transaction";
import { AnalyticsRoutes } from "./analytics";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {loginRoutes}
      <Route path="/" element={<CustomLayout />}>
        {dashboardRoutes}
        {NotFoundRoute}
        {CategoryRoutes}
        {TransactionRoutes}
        {AnalyticsRoutes}
      </Route>
    </>
  )
);
