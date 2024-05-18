import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminBreadboard = () => {
  const history = useHistory();

  const handleKullaniciAktifEt = () => {
    history.push('/kullaniciaktifet');
  };

  return (
    <div>
      {/* Diğer Breadboard içeriği */}
      <button onClick={handleKullaniciAktifEt}>Kullanıcı Aktif Et</button>
    </div>
  );
};

export default AdminBreadboard;
