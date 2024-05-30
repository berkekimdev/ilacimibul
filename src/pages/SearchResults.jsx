import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css'; // Stil dosyanızı buraya ekleyin

const SearchResults = () => {
  const location = useLocation();
  const { query, type } = location.state;
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [drugsWithStock, setDrugsWithStock] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs/search', {
          params: { query, type }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Arama sonuçları alınırken hata oluştu:', error);
      }
    };

    fetchResults();
  }, [query, type]);

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
            return { ...drug, totalStock };
          });

          setDrugsWithStock(drugsWithStockInfo);
        } catch (error) {
          console.error('Stok bilgileri alınırken hata oluştu:', error);
        }
      };

      fetchStocks();
    }
  }, [results]);

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
