import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../api/axiosConfig';

const ProtectedRoutes = () => {
  const token = getToken()
  if (!token) {
    return <Navigate to="/login" replace/>
  }
  return <Outlet/>
};

export default ProtectedRoutes;
