import { Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-public";
import UserProfile from "../../components/profile";

export const UserProfileRoute = (
  <Route>
    <Route
      path="/profile"
      element={<ProtectedRoute element={<UserProfile />} />}
    />
  </Route>
);
