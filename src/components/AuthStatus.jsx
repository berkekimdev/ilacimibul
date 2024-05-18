// src/components/AuthStatus.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthStatus = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Kullanıcı giriş yaptı</p>
          <p>Kullanıcı Bilgileri: {JSON.stringify(user)}</p>
        </div>
      ) : (
        <p>Kullanıcı giriş yapmadı</p>
      )}
    </div>
  );
};

export default AuthStatus;
