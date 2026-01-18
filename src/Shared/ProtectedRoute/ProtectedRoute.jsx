import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
// عدلي المسار حسب مكان الملف

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
  let role = user?.userGroup;
  if (loading) return <div>Loading...</div>;

  if (loading) return <div>Loading...</div>;

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={"/dashboard"} replace />;
  }

  // لو مسجل دخول، نعرض المحتوى المحمي
  return children;
}
