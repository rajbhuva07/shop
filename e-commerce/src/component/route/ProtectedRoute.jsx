import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';


const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('token');
  return token  ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
