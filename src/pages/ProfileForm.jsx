import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ProfileForm.css'; // CSS dosyasını ekleyin

const ProfileForm = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    eczaneAdi: '',
    city: '',
    email: '',
    phoneNumber: '',
    address: '',
    district: '',
    role: '',
    latitude: '',
    longitude: '',
    active: true,  // Varsayılan olarak true
    enabled: true  // Varsayılan olarak true
  });
  const [userId, setUserId] = useState(null); // Kullanıcı ID'sini tutmak için state
  const [message, setMessage] = useState(''); // Güncelleme mesajı için state

  // Kullanıcı email'ine göre kullanıcı ID'sini al
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
    const fetchUserData = async () => {
      const id = await getUserIdByEmail(user.sub);
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Fetched user data:', response.data);
          const userData = response.data;
          setUserId(id); // Kullanıcı ID'sini kaydet
          setFormData({
            eczaneAdi: userData.eczaneAdi,
            city: userData.city,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
            district: userData.district,
            role: userData.role,
            latitude: userData.latitude,
            longitude: userData.longitude,
            active: userData.active, // Kullanıcının mevcut active değeri
            enabled: userData.enabled // Kullanıcının mevcut enabled değeri
          });
        } catch (error) {
          console.error('Kullanıcı verileri alınamadı:', error);
          setMessage('Kullanıcı verileri alınamadı');
        }
      } else {
        console.error('Kullanıcı ID bulunamadı');
        setMessage('Kullanıcı ID bulunamadı');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage('Kullanıcı ID bulunamadı');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Kullanıcı güncellendi'); // Güncelleme başarılı mesajı
    } catch (error) {
      console.error('Kullanıcı güncellenemedi:', error);
      setMessage('Kullanıcı güncellenemedi'); // Güncelleme başarısız mesajı
    }
  };

  return (
    <div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profil Bilgileri</h2>
        <label>
          Eczane Adı:
          <input type="text" name="eczaneAdi" value={formData.eczaneAdi} onChange={handleChange} />
        </label>
        <label>
          Şehir:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Telefon Numarası:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Adres:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          İlçe:
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
        </label>
        <button type="submit">Güncelle</button>
      </form>
      {message && <p>{message}</p>} {/* Güncelleme mesajını göster */}
    </div>
  );
};

export default ProfileForm;
