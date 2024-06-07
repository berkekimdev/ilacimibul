// React ve Link bileşeni import ediliyor
import React from 'react';
import { Link } from 'react-router-dom';
import './Harfler.css'; // Harfler bileşeni için stil dosyası

// Harfler bileşeni tanımlanıyor
const Harfler = () => {
  // Türkçe alfabedeki harfler dizisi oluşturuluyor
  const harfler = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];

  return (
    // Harfleri içeren kutunun dış div'i
    <div className="harfler-kutu">
      {/* Harfler dizisi üzerinden map ile geçilerek her bir harf için Link bileşeni oluşturuluyor */}
      {harfler.map((harf) => (
        // Her harf için bir Link bileşeni oluşturuluyor
        // Link, tıklanınca /harfegoreara/{harf} yoluna yönlendirir
        <Link key={harf} to={`/harfegoreara/${harf}`} className="harf">
          {harf} {/* Harf burada gösteriliyor */}
        </Link>
      ))}
    </div>
  );
};

// Harfler bileşeni dışa aktarılıyor
export default Harfler;
