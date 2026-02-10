import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" /> : <Component />;
};

export default PublicRoute;
