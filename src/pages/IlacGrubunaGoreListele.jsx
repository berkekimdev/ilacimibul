import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IlacGrubunaGoreListele = () => {
    const { ilacGrubu } = useParams();
    const [rawData, setRawData] = useState('');

    useEffect(() => {
        const ilaclariGetir = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/drugs/byGroup?group=${encodeURIComponent(ilacGrubu)}`);
                setRawData(JSON.stringify(response.data, null, 2)); // Gelen veriyi ham formatta sakla
            } catch (error) {
                console.error('İlaç listesi alınırken bir hata oluştu:', error);
            }
        };

        ilaclariGetir();
    }, [ilacGrubu]);

    return (
        <div>
            <h1>{decodeURIComponent(ilacGrubu)} Grubundaki İlaçlar</h1>
            <pre>{rawData}</pre> {/* Ham veriyi sayfaya yazdır */}
        </div>
    );
};

export default IlacGrubunaGoreListele;
