import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ element: Component, requiredRoles, ...rest }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return Component;
};

export default ProtectedRoute;