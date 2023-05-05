import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";
import { UserRole } from "../models/userRole";

const AdminRoute = ({
  element: Component,
}: {
  element: JSX.Element;
}) => {
  const userRole = authService.getUserRole();
  const hasPermission = userRole === UserRole.ADMIN || userRole === UserRole.SUPERADMIN;

  return (
        hasPermission? Component : <Navigate replace to="/not-authorized" />
  );
};

export default AdminRoute;
