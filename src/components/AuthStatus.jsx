// React kütüphanesi ve useAuth hook'u import ediliyor
import React from 'react';
import { useAuth } from '../context/AuthContext';

// AuthStatus bileşeni tanımlanıyor
const AuthStatus = () => {
  // useAuth hook'u kullanılarak authentication durumu ve kullanıcı bilgileri alınıyor
  const { isLoggedIn, user } = useAuth();

  // Bileşenin döndüreceği JSX yapısı
  return (
    <div>
      {/* Kullanıcının giriş yapıp yapmadığı kontrol ediliyor */}
      {isLoggedIn ? (
        <div>
          <p>Kullanıcı giriş yaptı</p>
          <p>Kullanıcı Bilgileri: {JSON.stringify(user)}</p> {/* Kullanıcı bilgileri JSON formatında gösteriliyor */}
        </div>
      ) : (
        <p>Kullanıcı giriş yapmadı</p>
      )}
    </div>
  );
};

// AuthStatus bileşeni dışa aktarılıyor
export default AuthStatus;
