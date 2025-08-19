import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../api/axiosConfig";

const PublicRoutes = () => {
  const token = getToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
