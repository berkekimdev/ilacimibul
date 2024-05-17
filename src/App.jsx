import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // AuthProvider'ı import et
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
import DrugEczaneListesi from './pages/DrugEczaneListesi';
import IlacGrubuListele from './pages/IlacGrubunaGoreListele';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* AuthProvider ile tüm Routes'ları sarmalayın */}
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
              <Route path="/ilacgrubunagorelistele/:grup" element={<IlacGrubuListele />} />
              <Route path="/drugsearch" element={<DrugSearch />} />
              <Route path="/drugeczanelistesi/:drugId" element={<DrugEczaneListesi />} />
              <Route path="/nobetcieczaneler" element={<DutyPharmacies />} />
              <Route path="/harfegoreara/:harf" element={<HarfSayfasi />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
