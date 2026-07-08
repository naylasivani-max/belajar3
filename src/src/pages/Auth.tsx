import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WalletIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  ArrowRightIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAppContext();
  const navigate = useNavigate();
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    login(email || 'mahasiswa@kampus.ac.id', name || 'Mahasiswa');
    navigate('/dashboard');
  };
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <WalletIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Kantong<span className="text-indigo-600">Kuliah</span>
          </h1>
          <p className="text-slate-500">
            {isLogin ?
            'Selamat datang kembali! Yuk cek keuanganmu.' :
            'Mulai perjalanan hematmu sekarang.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Toggle */}
          <div className="flex p-2 bg-slate-50 border-b border-slate-100">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              
              Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              
              Daftar Baru
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                initial={{
                  opacity: 0,
                  x: isLogin ? -20 : 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: isLogin ? 20 : -20
                }}
                transition={{
                  duration: 0.2
                }}
                onSubmit={handleSubmit}
                className="space-y-5">
                
                {!isLogin &&
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nama Panggilan
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rangga"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    
                    </div>
                  </div>
                }

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Kampus
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@kampus.ac.id"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    
                  </div>
                </div>

                {isLogin &&
                <div className="flex justify-end">
                    <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    
                      Lupa password?
                    </a>
                  </div>
                }

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2">
                  
                  {isLogin ? 'Masuk ke Dashboard' : 'Buat Akun Gratis'}{' '}
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Hanya simulasi UI. Gunakan data sembarang untuk masuk.
        </p>
      </div>
    </div>);

};