import { Navigate, useLocation } from "react-router";
import Cookies from "js-cookie";
import { observer } from "mobx-react-lite";

const PrivateRoute = observer(({ element: Component, ...rest }) => {
  const isAuthenticated = Cookies.get('user') !== null;
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} />
  );
});

export default PrivateRoute;