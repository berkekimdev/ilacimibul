import React from 'react';
import './Anasayfa.css'; // CSS dosyasını import edin

const Anasayfa = () => {
  return (
     <div className="container">
       <div className="alan1">
         <h1>Yeni İlaçlar</h1>
         <p>Bu 1. alandır. Ekranın soluna yapışık, ekranın yüzde 75'ine kadar sağa kadar kutu kaplar.</p>
       </div>
       <div className="alan2">
         <h2>2. Alan</h2>
         <p>Bu 2. alan, 1. alanın en altına yapışık. Ekranın sağa doğru %50'sini kaplar.</p>
       </div>
       <div className="alan3">
         <h2>En Çok Aranan İlaçlar</h2>
         <p>Bu 3. alan, 1. alanın sağına bağlı yapışık. Ekranın %25'ini kaplar.</p>
       </div>
     </div>
  );
 };
 
 export default Anasayfa;
