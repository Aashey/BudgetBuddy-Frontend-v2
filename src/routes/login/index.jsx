import { Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "../protected-public";
import { LoginForm, SignupForm } from "../../components/login";

export const loginRoutes = (
  <Route>
    <Route path="/" element={<ProtectedRoute element={<LoginForm />} />} />
    <Route path="/login" element={<PublicRoute element={<LoginForm />} />} />
    <Route path="/signup" element={<PublicRoute element={<SignupForm />} />} />
  </Route>
);
