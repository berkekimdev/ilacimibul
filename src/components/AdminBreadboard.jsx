import React from 'react';
import { useHistory } from 'react-router-dom';

// AdminBreadboard bileşeni tanımlanıyor
const AdminBreadboard = () => {
  // useHistory hook'u kullanılarak history nesnesi oluşturuluyor
  const history = useHistory();

  // Kullanıcıyı aktif etme sayfasına yönlendiren fonksiyon
  const handleKullaniciAktifEt = () => {
    history.push('/kullaniciaktifet'); // '/kullaniciaktifet' yoluna yönlendir
  };

  // İlaç silme sayfasına yönlendiren fonksiyon
  const handleIlacSil = () => {
    history.push('/ilacsil'); // '/ilacsil' yoluna yönlendir
  };

  return (
    <div>
      {/* Diğer Breadboard içeriği */}
      {/* user nesnesi kontrol ediliyor ve rolü 'admin' ise butonlar gösteriliyor */}
      {user && user.role === 'admin' && (
        <>
          <button onClick={handleKullaniciAktifEt}>Kullanıcı Aktif Et</button>
          <button onClick={handleIlacSil}>İlaç Sil</button>
        </>
      )}
    </div>
  );
};

// AdminBreadboard bileşeni dışa aktarılıyor
export default AdminBreadboard;
