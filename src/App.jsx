// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header'; // Header bileşenini import edin
import Footer from './components/Footer';
import Login from './pages/Login';
import Anasayfa from './pages/Anasayfa'; // Varsayılan anasayfa komponentinizi import edin
import Register from './pages/Register';
import DrugSearch from './pages/DrugSearch';
import DutyPharmacies from './pages/DutyPharmacies';
import EczaneAra from './pages/EczaneAra';
import HarfSayfasi from './components/HarfSayfasi';
import Harfler from './components/Harfler';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Harfler />
        <Routes>
          <Route path="/" element={<Anasayfa />} /> {/* Anasayfa */}
          <Route path="/login" element={<Login />} /> {/* Login sayfası */}
          <Route path="/Eczaneler" element={<EczaneAra />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/drugsearch" element={<DrugSearch />} />
          <Route path="/nobetcieczaneler" element={<DutyPharmacies/>} />
          <Route path="/harfegoreara/:harf" element={<HarfSayfasi />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
