import { Navigate, useLocation } from "react-router";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";

const PrivateRoute = observer(({ element: Component, ...rest }) => {
  const isAuthenticated = userStore.user !== undefined;
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} />
  );
});

export default PrivateRoute;