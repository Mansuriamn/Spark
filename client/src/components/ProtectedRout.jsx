import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const selectedRole = localStorage.getItem('selectedRole');
  const isAuthenticated = !!localStorage.getItem('authToken');

  // console.log('ProtectedRoute:', { isAuthenticated, selectedRole }); // Debug

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!selectedRole || !allowedRoles.includes(selectedRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;