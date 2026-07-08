import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './src/context/AppContext';
import { Navbar } from './src/components/layout/Navbar';
import { Footer } from './src/components/layout/Footer';
import { Beranda } from './src/pages/Beranda';
import { Dashboard } from './src/pages/Dashboard';
import { Kalkulator } from './src/pages/Kalkulator';
import { Diskon } from './src/pages/Diskon';
import { Reminder } from './src/pages/Reminder';
import { Edukasi } from './src/pages/Edukasi';
import { Komunitas } from './src/pages/Komunitas';
import { Profil } from './src/pages/Profil';
import { Auth } from './src/pages/Auth';
import { useScreenInit } from './useScreenInit';
const AppContent = () => {
  useScreenInit(); // Magic Patterns screen init
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/kalkulator" element={<Kalkulator />} />
          <Route path="/diskon" element={<Diskon />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/komunitas" element={<Komunitas />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </main>
      <Footer />
    </div>);

};
export function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>);

}