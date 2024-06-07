// Gerekli modüller ve bileşenler import ediliyor
import React, { useState, useEffect, useRef } from 'react';
import './Register.css';
import { allCitiesAndDistricts } from './allcitiesAndDistricts'; // Şehir ve ilçeler verisi import ediliyor
import axios from 'axios'; // HTTP istekleri için axios kullanılıyor
import { useNavigate } from 'react-router-dom'; // Sayfa yönlendirmeleri için kullanılıyor

const Register = () => {
    // Form state'leri tanımlanıyor
    const [email, setEmail] = useState('');
    const [pharmacyName, setPharmacyName] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [cities, setCities] = useState(Object.keys(allCitiesAndDistricts));
    const [districts, setDistricts] = useState([]);
    const dialogRef = useRef(null); // Dialog kutusu için referans
    const navigate = useNavigate(); // Sayfa yönlendirmeleri için navigate fonksiyonu

    // Kullanıcının konumunu al
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Konum bilgileri alınamadı:', error);
                }
            );
        } else {
            console.error('Tarayıcınız konum bilgilerini desteklemiyor.');
        }
    }, []);

    // Şehir değiştiğinde ilgili ilçeleri güncelle
    useEffect(() => {
        setDistricts(city ? allCitiesAndDistricts[city] : []);
    }, [city]);

    // Form submit işlemi
    const handleSubmit = async (event) => {
        event.preventDefault();
        const registrationData = {
            eczaneAdi: pharmacyName,
            city: city,
            email: email,
            password: password,
            district: district,
            phoneNumber: phoneNumber,
            address: address,
            latitude: latitude,
            longitude: longitude,
            role: 'MEMBER'
        };

        try {
            await axios.post('http://localhost:8080/crackit/v1/auth/register', registrationData);
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        } catch (error) {
            console.error('Registration Error:', error.response);
        }
    };

    // Dialog kutusunu kapat ve giriş sayfasına yönlendir
    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Kayıt</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="pharmacyName">Eczane Adı:</label>
                    <input type="text" id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Şifre:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="address">Adres:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">Telefon Numarası:</label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="city">Şehir:</label>
                    <select id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Şehir Seçin</option>
                        {cities.map((cityName) => (
                            <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="district">İlçe:</label>
                    <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                        <option value="">İlçe Seçin</option>
                        {districts.map((districtName) => (
                            <option key={districtName} value={districtName}>{districtName}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Onayla</button>
            </form>
            <dialog ref={dialogRef}>
                <h2>Kayıt işleminiz gerçekleşti</h2>
                <p>Hesabınızın aktifleşmesi için lütfen eczane olduğunuzu kanıtlayan evraklarınızı mail atınız: admin@example.com</p>
                <button onClick={closeDialog}>Tamam</button>
            </dialog>
        </div>
    );
};

export default Register;
