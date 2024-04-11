import React from 'react';

import './IlacListesi.css';
const IlacListesi = ({ ilaclar }) => {
  return (
    <div className="ilac-listesi">
      <table>
        <thead>
          <tr>
            <th>İlaç Adı</th>
            <th>İlaç Grubu</th>
            <th>İlaç Etken Maddesi</th>
            <th>İlaç Stoğu</th>
            <th>Eczanede Bul</th>
          </tr>
        </thead>
        <tbody>
          {ilaclar.map((ilac, index) => (
            <tr key={index}>
              <td>{ilac.adi}</td>
              <td>{ilac.grup}</td>
              <td>{ilac.etkenMaddesi}</td>
              <td>{ilac.stok}</td>
              <td>
                <button onClick={() => eczanedeBul(ilac.id)}>Eczanede Bul</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Örnek ilaçlar
const ornekIlaclar = [
  { id: 1, adi: "İlaç Adı 1", grup: "İlaç Grubu 1", etkenMaddesi: "Etken Madde 1", stok: 100 },
  { id: 2, adi: "İlaç Adı 2", grup: "İlaç Grubu 2", etkenMaddesi: "Etken Madde 2", stok: 200 },
  { id: 3, adi: "İlaç Adı 3", grup: "İlaç Grubu 3", etkenMaddesi: "Etken Madde 3", stok: 300 },
];

const App = () => {
  return (
    <div>
      <h1>İlaç Listesi</h1>
      <IlacListesi ilaclar={ornekIlaclar} />
    </div>
  );
};

export default App;
