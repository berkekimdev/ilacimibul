// src/pages/Register.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Register.css';
import { allCitiesAndDistricts } from './allcitiesAndDistricts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
    const dialogRef = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        setDistricts(city ? allCitiesAndDistricts[city] : []);
    }, [city]);

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

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="pharmacyName">Pharmacy Name:</label>
                    <input type="text" id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="city">City:</label>
                    <select id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Select a city</option>
                        {cities.map((cityName) => (
                            <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="district">District:</label>
                    <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                        <option value="">Select a district</option>
                        {districts.map((districtName) => (
                            <option key={districtName} value={districtName}>{districtName}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
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
