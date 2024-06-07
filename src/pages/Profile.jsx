// Gerekli modül ve bileşen import ediliyor
import React from 'react';
import ProfileForm from './ProfileForm'; // Profil formu bileşeni import ediliyor

// Profile bileşeni tanımlanıyor
const Profile = () => {
  return (
    <div>
      {/* Profil bilgileri başlığı */}
      <h1>Profil Bilgileri</h1>
      {/* ProfileForm bileşeni render ediliyor */}
      <ProfileForm />
    </div>
  );
};

// Bileşen export ediliyor
export default Profile;
