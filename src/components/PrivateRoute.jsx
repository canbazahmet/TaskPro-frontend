import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
