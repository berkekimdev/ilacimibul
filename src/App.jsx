import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Anasayfa from './pages/Anasayfa';
import Register from './pages/Register';
import DrugSearch from './pages/DrugSearch';
import DutyPharmacies from './pages/DutyPharmacies';
import EczaneAra from './pages/EczaneAra';
import HarfSayfasi from './components/HarfSayfasi';
import Harfler from './components/Harfler';
import Ilaclar from './pages/Ilaclar';
import IlacGrubu from './pages/IlacGrubu';
import EczaneListesi from './pages/EczaneListesi';
import backgroundImage from './images/sihirli.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Harfler />
        {/* Arka plan resmi için kullanılacak div'i ve Routes bileşenini sar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Anasayfa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Eczaneler" element={<EczaneAra />} />
            <Route path="/Ilaclar" element={<Ilaclar />} />
            <Route path="/IlacGrubu" element={<IlacGrubu />} />
            <Route path="/EnYakinEczaneler" element={<EczaneListesi />} />
            <Route path="/register" element={<Register />} />
            <Route path="/drugsearch" element={<DrugSearch />} />
            <Route path="/nobetcieczaneler" element={<DutyPharmacies/>} />
            <Route path="/harfegoreara/:harf" element={<HarfSayfasi />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
