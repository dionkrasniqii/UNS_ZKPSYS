import jwtDecode from "jwt-decode";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const isAuthorized = user && allowedRoles.includes(user.role);
  return isAuthorized ? <Component {...rest} /> : <Navigate to='/' />;
};
export default PrivateRoute;
