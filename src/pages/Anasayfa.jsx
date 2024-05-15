import React from 'react';
import './Anasayfa.css'; // CSS dosyasını import edin
import backgroundImage from '../images/sihirli.svg'; // SVG dosyanız

const Anasayfa = () => {
  return (
    <div className="container">
      <div className="svg-container">
        <img src={backgroundImage} alt="Arka Plan" />
      </div>
      <div className="content">
        <div className="alan1">
          <h1>Yeni İlaçlar</h1>
          <p>Bu 1. alandır. Tüm içerik alanlarının boyutu eşit.</p>
        </div>
        <div className="alan2">
          <h2>2. Alan</h2>
          <p>Bu 2. alan, 1. alan ile aynı genişlik ve konumdadır.</p>
        </div>
        <div className="alan3">
          <h2>En Çok Aranan İlaçlar</h2>
          <p>Bu 3. alan, 1. alan ile aynı genişlik ve konumdadır.</p>
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
