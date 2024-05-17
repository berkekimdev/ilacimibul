import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IlacGrubu = () => {
    const [ilacGruplari, setIlacGruplari] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drugs')
            .then(response => {
                const gruplar = new Set(response.data.map(ilac => ilac.ilacGrubu));
                setIlacGruplari(Array.from(gruplar));
            })
            .catch(error => console.error('Hata:', error));
    }, []);

    return (
        <div>
            {ilacGruplari.map(grup => (
                <Link key={grup} to={`/ilacgrubunagorelistele/${encodeURIComponent(grup)}`}>
                    <button>{grup}</button>
                </Link>
            ))}
        </div>
    );
};

export default IlacGrubu;
