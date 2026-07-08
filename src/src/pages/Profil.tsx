import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MailIcon,
  ShieldIcon,
  LogOutIcon,
  SettingsIcon,
  ZapIcon,
  CreditCardIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
export const Profil = () => {
  const { user, isPremium, points, logout } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  if (!user) return null;
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Profil Saya</h1>

      <div className="space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          {isPremium &&
          <div className="absolute top-0 right-0 bg-lime-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wide flex items-center gap-1">
              <ZapIcon className="w-3 h-3 fill-slate-900" /> Premium Member
            </div>
          }

          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 border-4 border-white shadow-md shrink-0">
            {user.name.charAt(0)}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {user.name}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 mb-4">
              <MailIcon className="w-4 h-4" /> {user.email}
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <div className="bg-lime-50 border border-lime-100 px-4 py-2 rounded-xl flex items-center gap-2">
                <ZapIcon className="w-4 h-4 text-lime-600 fill-lime-600" />
                <span className="font-bold text-lime-800">
                  {points} Poin Hemat
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-slate-500" />
                <span className="font-medium text-slate-700">
                  Mahasiswa Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Pengaturan Akun</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-700">
                  Edit Profil Pribadi
                </span>
              </div>
              <SettingsIcon className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <CreditCardIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-slate-700 block">
                    Langganan & Pembayaran
                  </span>
                  <span className="text-xs text-slate-500">
                    {isPremium ? 'Premium Aktif' : 'Gratis'}
                  </span>
                </div>
              </div>
              <SettingsIcon className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          
          <LogOutIcon className="w-5 h-5" /> Keluar Akun
        </button>
      </div>
    </div>);

};