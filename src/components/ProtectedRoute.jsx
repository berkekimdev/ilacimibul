import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  if (!user || !user.role || (roles && !roles.includes(user.role))) {
    // Kullanıcının rolü gerekli değilse yetki mesajı göster
    return <div>Buraya girmek için yetkiniz yoktur.</div>;
  }

  // Gerekli kontrolleri geçerse bileşeni render et
  return <Component {...rest} />;
};

export default ProtectedRoute;
