// React ve diğer gerekli kütüphaneler import ediliyor
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // JWT token'ını decode etmek için jwt-decode kütüphanesi

// AuthContext oluşturuluyor
const AuthContext = createContext(null);

// AuthProvider bileşeni tanımlanıyor
export const AuthProvider = ({ children }) => {
  // Giriş durumu, kullanıcı bilgileri ve token için state tanımları
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Başlangıç değeri localStorage'dan alınıyor
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Component mount edildiğinde token kontrolü yapılıyor
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.authorities.includes('ROLE_ADMIN') ? 'Admin' : 'Member'; // Kullanıcı rolü belirleniyor
      setUser({
        ...decodedToken,
        role: role // Kullanıcının rolü ekleniyor
      });
      setIsLoggedIn(true); // Kullanıcı giriş durumu güncelleniyor
      setToken(token);
    }
  }, []);

  // Kullanıcı giriş yaparken çalışacak fonksiyon
  const login = (token) => {
    localStorage.setItem('token', token); // Token localStorage'a kaydediliyor
    const decodedToken = jwtDecode(token); // Token decode ediliyor
    const role = decodedToken.authorities.includes('ROLE_ADMIN') ? 'Admin' : 'Member'; // Kullanıcı rolü belirleniyor
    setUser({
      ...decodedToken,
      role: role // Kullanıcının rolü ekleniyor
    });
    setIsLoggedIn(true); // Kullanıcı giriş durumu güncelleniyor
    setToken(token);
  };

  // Kullanıcı çıkış yaparken çalışacak fonksiyon
  const logout = () => {
    localStorage.removeItem('token'); // Token localStorage'dan siliniyor
    setUser(null); // Kullanıcı bilgileri sıfırlanıyor
    setIsLoggedIn(false); // Kullanıcı giriş durumu sıfırlanıyor
    setToken(null);
  };

  // Kullanıcı bilgilerini güncellemek için fonksiyon
  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Kullanıcı bilgileri güncelleniyor
  };

  // AuthContext.Provider ile sağlayıcı oluşturuluyor ve çocuk bileşenler sağlanan değere erişebiliyor
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'e erişmek için custom hook oluşturuluyor
export const useAuth = () => useContext(AuthContext);
