// React ve diğer gerekli kütüphaneler import ediliyor
import React from 'react';
import { Navigate } from 'react-router-dom'; // Yönlendirme için Navigate bileşeni
import { useAuth } from '../context/AuthContext'; // AuthContext'ten kimlik doğrulama durumu

// ProtectedRoute bileşeni tanımlanıyor
const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  // AuthContext'ten gerekli değerler alınıyor
  const { isLoggedIn, user } = useAuth();

  // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Kullanıcı rolü yoksa veya gerekli role sahip değilse yetkisiz uyarısı göster
  if (!user || !user.role || (roles && !roles.includes(user.role))) {
    return <div>Buraya girmek için yetkiniz yoktur.</div>;
  }

  // Tüm kontrolleri geçen kullanıcı için istenen bileşeni render et
  return <Component {...rest} />;
};

// ProtectedRoute bileşeni dışa aktarılıyor
export default ProtectedRoute;
