// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Anasayfa from './pages/Anasayfa'; // Varsayılan anasayfa komponentinizi import edin
import Register from './pages/Register';
import DrugSearch from './pages/DrugSearch';
import DutyPharmacies from './pages/DutyPharmacies';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Anasayfa />} /> {/* Anasayfa */}
          <Route path="/login" element={<Login />} /> {/* Login sayfası */}
          {/* Diğer sayfalarınızın route'ları buraya eklenebilir */}
          <Route path="/register" element={<Register />} />
          <Route path="/drugsearch" element={<DrugSearch />} />
          <Route path="/nobetcieczaneler" element={<DutyPharmacies/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
