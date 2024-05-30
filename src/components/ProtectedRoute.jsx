import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!user || !user.role || (roles && !roles.includes(user.role))) {
    return <div>Buraya girmek için yetkiniz yoktur.</div>;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
