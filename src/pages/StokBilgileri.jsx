import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StokBilgileri = () => {
  const { user, token } = useAuth();
  const [drugs, setDrugs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  const getUserIdByEmail = async (email) => {
    try {
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Users fetched for ID retrieval:', response.data);
      const userData = response.data.find(u => u.email === email);
      console.log('User data found:', userData);
      return userData ? userData.id : null;
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
      setMessage('Kullanıcı bilgileri alınırken hata oluştu');
      return null;
    }
  };

  useEffect(() => {
    const fetchDrugStocks = async () => {
      const id = await getUserIdByEmail(user.sub);
      if (id) {
        try {
          const response = await axios.get('http://localhost:8080/api/drugstocks', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const userDrugs = response.data.filter(drug => drug.userId === id && drug.quantity > 0);
          setDrugs(userDrugs);
          setUserId(id);
        } catch (error) {
          console.error('İlaç stokları alınamadı:', error);
          setMessage('İlaç stokları alınamadı');
        }
      } else {
        console.error('Kullanıcı ID bulunamadı');
        setMessage('Kullanıcı ID bulunamadı');
      }
    };

    if (user) {
      fetchDrugStocks();
    }
  }, [user, token]);

  return (
    <div>
      <h1>Profil Bilgileri</h1>
      <h2>İlaç Stokları</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>İlaç Adı</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.drugName}</td>
              <td>{drug.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StokBilgileri;
