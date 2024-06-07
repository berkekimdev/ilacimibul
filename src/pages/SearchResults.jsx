// Gerekli modüller ve bileşenler import ediliyor
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css'; // Stil dosyasını import edin

const SearchResults = () => {
  // React Router'dan konum ve navigate fonksiyonları alınıyor
  const location = useLocation();
  const { query, type } = location.state; // Arama sorgusu ve tipi state'den alınıyor
  const navigate = useNavigate();
  const [results, setResults] = useState([]); // Arama sonuçları için state
  const [drugsWithStock, setDrugsWithStock] = useState([]); // Stok bilgisi ile birlikte ilaçlar için state

  // İlk useEffect: Arama sorgusunu API'ye gönder ve sonuçları al
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs/search', {
          params: { query, type }
        });
        setResults(response.data); // Arama sonuçlarını state'e kaydet
      } catch (error) {
        console.error('Arama sonuçları alınırken hata oluştu:', error);
      }
    };

    fetchResults();
  }, [query, type]); // query ve type değiştiğinde useEffect tekrar çalışır

  // İkinci useEffect: Arama sonuçlarına göre stok bilgilerini al
  useEffect(() => {
    if (results.length > 0) {
      const fetchStocks = async () => {
        try {
          const stocksResponse = await axios.get('http://localhost:8080/api/drugstocks');
          const allStocks = stocksResponse.data;

          const drugsWithStockInfo = results.map(drug => {
            const totalStock = allStocks
              .filter(stock => stock.drugId === drug.id)
              .reduce((sum, stock) => sum + stock.quantity, 0);
            return { ...drug, totalStock }; // İlaç bilgilerine toplam stok miktarını ekle
          });

          setDrugsWithStock(drugsWithStockInfo); // Stok bilgisi ile birlikte ilaçları state'e kaydet
        } catch (error) {
          console.error('Stok bilgileri alınırken hata oluştu:', error);
        }
      };

      fetchStocks();
    }
  }, [results]); // results değiştiğinde useEffect tekrar çalışır

  // İlaç ID'sine göre eczane listesine yönlendirme fonksiyonu
  const eczanedeBul = (ilacId) => {
    navigate(`/drugeczanelistesi/${ilacId}`);
  };

  return (
    <div>
      <h2>Arama Sonuçları</h2>
      {drugsWithStock.length > 0 ? (
        <table className="results-table">
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
            {drugsWithStock.map((drug, index) => (
              <tr key={index}>
                <td>{drug.ilacAdi}</td>
                <td>{drug.ilacGrubu}</td>
                <td>{drug.ilacEtkenMaddesi}</td>
                <td>{drug.totalStock}</td>
                <td>
                  <button onClick={() => eczanedeBul(drug.id)}>Eczanede Bul</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchResults;
