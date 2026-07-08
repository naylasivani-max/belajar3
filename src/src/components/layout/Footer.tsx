import React from 'react';
import { Link } from 'react-router-dom';
import { WalletIcon, InstagramIcon, TwitterIcon, MailIcon } from 'lucide-react';
export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/Desain_tanpa_judul_(4).png"
                alt="KantongKuliah"
                className="w-9 h-9 rounded-lg object-contain bg-white" />
              
              <span className="font-bold text-xl text-white tracking-tight">
                Kantong<span className="text-indigo-400">Kuliah</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              Aplikasi pencatat keuangan pintar khusus mahasiswa. Pegang kendali
              uang sakumu, mulai hemat dari sekarang.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Fitur Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Tracking Pengeluaran
                </Link>
              </li>
              <li>
                <Link
                  to="/reminder"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Reminder Tagihan
                </Link>
              </li>
              <li>
                <Link
                  to="/kalkulator"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Kalkulator Cerdas
                </Link>
              </li>
              <li>
                <Link
                  to="/diskon"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Marketplace Diskon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Komunitas & Edukasi
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/edukasi"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Artikel Finansial
                </Link>
              </li>
              <li>
                <Link
                  to="/komunitas"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Leaderboard Hemat
                </Link>
              </li>
              <li>
                <Link
                  to="/komunitas"
                  className="hover:text-indigo-400 transition-colors">
                  
                  Galeri Badge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Kontak Kami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} KantongKuliah. Dibuat untuk
            mahasiswa Indonesia.
          </p>
          <p>Simulasi UI/UX - Bukan aplikasi finansial sungguhan.</p>
        </div>
      </div>
    </footer>);

};