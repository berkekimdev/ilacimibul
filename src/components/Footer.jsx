import React from 'react';
import './Footer.css'; // Footer stil dosyası için

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        {/* Buraya iletişim bilgilerinizi ekleyebilirsiniz */}
        Eczanelerin gerçek olup olmadığına dair belgeleri göndereceği mail adresi berkekim1@gmail.com
      </div>
      <div className="footer-right">
        İlaç Takip Sistemi Berk Ekim 1711012851
      </div>
    </footer>
  );
};

export default Footer;
