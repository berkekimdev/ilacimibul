// Gerekli modüller ve bileşenler import ediliyor
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import NearestPharmacies from './pages/NearestPharmacies';
import DrugEczaneListesi from './pages/DrugEczaneListesi';
import IlacEkle from './pages/IlacEkle';
import UpdateDrug from './pages/UpdateDrug';
import IlacStokDegistir from './pages/IlacStokDegistir';
import IlacGrubuListele from './pages/IlacGrubunaGoreListele';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import StokBilgileri from './pages/StokBilgileri';
import KullaniciAktifEt from './pages/KullaniciAktifEt';
import IlacSil from './pages/IlacSil';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import AuthStatus from './components/AuthStatus';
import EczaneListele from './pages/EczaneListele';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Navbar />
          <Harfler />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Anasayfa />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Eczaneler" element={<EczaneListele />} />
              <Route path="/Ilaclar" element={<Ilaclar />} />
              <Route path="/IlacGrubu" element={<IlacGrubu />} />
              <Route path="/EnYakinEczaneler" element={<NearestPharmacies />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profilguncelle" element={
                <ProtectedRoute roles={['Admin', 'Member']} element={Profile} />
              } />
              <Route path="/profile" element={<StokBilgileri />} />
              <Route path="/ilacgrubunagorelistele/:ilacGrubu" element={<IlacGrubuListele />} />
              <Route path="/kullaniciaktifet" element={
                <ProtectedRoute roles={['Admin']} element={KullaniciAktifEt} />
              } />
              <Route path="/drugsearch" element={<DrugSearch />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/ilacsil" element={
                <ProtectedRoute roles={['Admin']} element={IlacSil} />
              } />
              <Route path="/ilacekle" element={
                <ProtectedRoute roles={['Admin', 'Member']} element={IlacEkle} />
              } />
              <Route path="/ilacstokdegistir" element={
                <ProtectedRoute roles={['Admin', 'Member']} element={IlacStokDegistir} />
              } />
               <Route path="/updatedrug" element={
                <ProtectedRoute roles={['Admin']} element={UpdateDrug} />
              } />
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
