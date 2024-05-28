import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminBreadboard = () => {
  const history = useHistory();

  const handleKullaniciAktifEt = () => {
    history.push('/kullaniciaktifet');
  };

  const handleIlacSil = () => {
    history.push('/ilacsil');
  };

  return (
    <div>
      {/* Diğer Breadboard içeriği */}
      {user && user.role === 'admin' && (
        <>
          <button onClick={handleKullaniciAktifEt}>Kullanıcı Aktif Et</button>
          <button onClick={handleIlacSil}>İlaç Sil</button>
        </>
      )}
    </div>
  );
};

export default AdminBreadboard;
