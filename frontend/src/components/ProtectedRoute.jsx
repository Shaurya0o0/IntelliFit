import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkeletonLoader from "./SkeletonLoader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
