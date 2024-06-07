// Gerekli modüller ve bileşenler import ediliyor
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// KullaniciAktifEt bileşeni tanımlanıyor
const KullaniciAktifEt = () => {
  const { token } = useAuth(); // AuthContext'ten token'ı alın
  const [users, setUsers] = useState([]); // Kullanıcı listesini tutmak için state
  const [message, setMessage] = useState(''); // Hata veya bilgi mesajı için state

  // Bileşen yüklendiğinde kullanıcıları API'den çekmek için useEffect hook'u kullanılıyor
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // API isteği ile kullanıcılar çekiliyor
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${token}` // Bearer token'ı Authorization başlığına ekleniyor
          }
        });
        setUsers(response.data); // Kullanıcılar state'e atanıyor
      } catch (error) {
        console.error('Kullanıcılar alınamadı:', error);
        setMessage('Kullanıcılar alınamadı'); // Hata mesajı set ediliyor
      }
    };

    fetchUsers(); // fetchUsers fonksiyonu çağrılıyor
  }, [token]); // token değiştiğinde useEffect tekrar çalışacak

  // Kullanıcı aktiflik durumunu değiştiren fonksiyon
  const handleActivate = async (id, active) => {
    try {
      // API isteği ile kullanıcı aktiflik durumu değiştiriliyor
      await axios.patch(`http://localhost:8080/api/users/${id}/activate`, { active }, {
        headers: {
          Authorization: `Bearer ${token}` // Bearer token'ı Authorization başlığına ekleniyor
        }
      });
      // Kullanıcılar state'i güncelleniyor
      setUsers(users.map(user => user.id === id ? { ...user, active } : user));
    } catch (error) {
      console.error('Kullanıcı durumu değiştirilemedi:', error);
      setMessage('Kullanıcı durumu değiştirilemedi'); // Hata mesajı set ediliyor
    }
  };

  // Bileşenin render ettiği JSX kodu
  return (
    <div>
      <h1>Kullanıcıları Aktif Et</h1>
      {message && <p>{message}</p>} {/* Hata veya bilgi mesajı gösteriliyor */}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Aktif Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => ( // Kullanıcılar listeleniyor
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.active ? 'Aktif' : 'İnaktif'}</td>
              <td>
                {user.active ? (
                  <button onClick={() => handleActivate(user.id, false)}>İnaktif Et</button> // Kullanıcı inaktif et butonu
                ) : (
                  <button onClick={() => handleActivate(user.id, true)}>Aktif Et</button> // Kullanıcı aktif et butonu
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Bileşen export ediliyor
export default KullaniciAktifEt;
