import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const KullaniciAktifEt = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Kullanıcılar alınamadı:', error);
        setMessage('Kullanıcılar alınamadı');
      }
    };

    fetchUsers();
  }, [token]);

  const handleActivate = async (id, active) => {
    try {
      await axios.patch(`http://localhost:8080/api/users/${id}/activate`, { active }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user => user.id === id ? { ...user, active } : user));
    } catch (error) {
      console.error('Kullanıcı durumu değiştirilemedi:', error);
      setMessage('Kullanıcı durumu değiştirilemedi');
    }
  };

  return (
    <div>
      <h1>Kullanıcıları Aktif Et</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Aktif Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.active ? 'Aktif' : 'İnaktif'}</td>
              <td>
                {user.active ? (
                  <button onClick={() => handleActivate(user.id, false)}>İnaktif Et</button>
                ) : (
                  <button onClick={() => handleActivate(user.id, true)}>Aktif Et</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KullaniciAktifEt;
