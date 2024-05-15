import React, { useState, useEffect } from 'react';
import './Register.css';
import { allCitiesAndDistricts } from './allcitiesAndDistricts';
import axios from 'axios';

// Tüm şehir ve ilçe bilgilerini içeren obje


const Register = () => {
  const [email, setEmail] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [latitude, setLatitude] = useState(40.7128); // Örnek değer, dinamik olmalı veya formdan girilmeli
  const [longitude, setLongitude] = useState(-74.0060); // Örnek değer, dinamik olmalı veya formdan girilmeli
  const [cities, setCities] = useState(Object.keys(allCitiesAndDistricts));
  const [districts, setDistricts] = useState([]);

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
      const response = await axios.post('http://localhost:8080/crackit/v1/auth/register', registrationData);
      console.log('Registration Success:', response.data);
      // Başarılı kayıt sonrası işlemler
    } catch (error) {
      console.error('Registration Error:', error.response);
      // Hata durumunda işlemler
    }
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
    </div>
  );
};

export default Register;