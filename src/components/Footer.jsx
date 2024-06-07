// React kütüphanesi ve stil dosyası import ediliyor
import React from 'react';
import './Footer.css'; // Footer bileşeni için stil dosyası

// Footer bileşeni tanımlanıyor
const Footer = () => {
  return (
    // footer HTML etiketi, "footer" sınıfı ile stil uygulanıyor
    <footer className="footer">
      <div className="footer-left">
        {/* İletişim bilgileri burada gösteriliyor */}
        Eczanelerin gerçek olup olmadığına dair belgeleri göndereceği mail adresi berkekim1@gmail.com
      </div>
      <div className="footer-right">
        {/* Sistemin adı ve geliştirici bilgileri burada gösteriliyor */}
        İlaç Takip Sistemi Berk Ekim 1711012851
      </div>
    </footer>
  );
};

// Footer bileşeni dışa aktarılıyor
export default Footer;
