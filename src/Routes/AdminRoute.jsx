import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  // console.log(location.pathname);

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    // console.log(user?.email);
    return children;
  }
  return <Navigate state={location.pathname} to="/" replace></Navigate>;
};
export default AdminRoute;
