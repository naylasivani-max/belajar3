import React from 'react';
import { motion } from 'framer-motion';
import {
  TrophyIcon,
  ZapIcon,
  MedalIcon,
  UsersIcon,
  FlameIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
const LEADERBOARD = [
{
  rank: 1,
  name: 'Budi S.',
  points: 2450,
  avatar: 'B',
  campus: 'Universitas Indonesia'
},
{
  rank: 2,
  name: 'Siti A.',
  points: 2100,
  avatar: 'S',
  campus: 'ITB'
},
{
  rank: 3,
  name: 'Rangga (Kamu)',
  points: 1250,
  avatar: 'R',
  campus: 'UGM',
  isMe: true
},
{
  rank: 4,
  name: 'Dimas P.',
  points: 1100,
  avatar: 'D',
  campus: 'Universitas Brawijaya'
},
{
  rank: 5,
  name: 'Ayu L.',
  points: 980,
  avatar: 'A',
  campus: 'Universitas Diponegoro'
}];

const ALL_BADGES = [
{
  id: 'First Login',
  icon: '👋',
  name: 'Anak Baru',
  desc: 'Login untuk pertama kalinya',
  rarity: 'common',
  owned: true
},
{
  id: 'Saver Month',
  icon: '🐷',
  name: 'Si Paling Nabung',
  desc: 'Sisa budget > 20% di akhir bulan',
  rarity: 'rare',
  owned: true
},
{
  id: 'Kos Master',
  icon: '🏠',
  name: 'Kos Master',
  desc: 'Bayar kos tepat waktu 3 bulan berturut-turut',
  rarity: 'epic',
  owned: true
},
{
  id: 'Promo Hunter',
  icon: '🎯',
  name: 'Promo Hunter',
  desc: 'Klaim 5 voucher diskon',
  rarity: 'common',
  owned: false
},
{
  id: 'Invest Pro',
  icon: '📈',
  name: 'Investor Muda',
  desc: 'Baca semua artikel investasi',
  rarity: 'rare',
  owned: false
},
{
  id: 'Streak 30',
  icon: '🔥',
  name: '30 Days Streak',
  desc: 'Catat pengeluaran 30 hari tanpa bolong',
  rarity: 'legendary',
  owned: false
}];

export const Komunitas = () => {
  const { user, points, badges } = useAppContext();
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* HEADER */}
      <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
            <UsersIcon className="w-8 h-8 text-lime-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Komunitas Hemat
          </h1>
          <p className="text-indigo-200 text-lg">
            Bersaing secara sehat, kumpulkan badge unik, dan buktikan kamu
            adalah mahasiswa paling jago atur uang!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COL: LEADERBOARD */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-yellow-500" /> Leaderboard
              Nasional
            </h2>
            <select className="bg-white border border-slate-200 text-sm font-medium rounded-lg px-3 py-1.5 outline-none">
              <option>Bulan Ini</option>
              <option>Sepanjang Waktu</option>
            </select>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {LEADERBOARD.map((u, idx) =>
            <motion.div
              key={u.rank}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: idx * 0.1
              }}
              className={`flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 last:border-0 ${u.isMe ? 'bg-indigo-50/50' : ''}`}>
              
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                  className={`w-8 font-bold text-xl text-center ${u.rank === 1 ? 'text-yellow-500' : u.rank === 2 ? 'text-slate-400' : u.rank === 3 ? 'text-amber-600' : 'text-slate-300'}`}>
                  
                    #{u.rank}
                  </div>
                  <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-sm ${u.isMe ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                  
                    {u.avatar}
                  </div>
                  <div>
                    <h4
                    className={`font-bold ${u.isMe ? 'text-indigo-900' : 'text-slate-800'}`}>
                    
                      {u.name}
                    </h4>
                    <p className="text-xs text-slate-500">{u.campus}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-lime-100 px-3 py-1.5 rounded-lg">
                  <ZapIcon className="w-4 h-4 text-lime-600 fill-lime-600" />
                  <span className="font-bold text-lime-800">{u.points}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT COL: BADGES */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MedalIcon className="w-6 h-6 text-indigo-600" /> Galeri Badge
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Badge Terkumpul
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {badges.length}{' '}
                  <span className="text-lg text-slate-400 font-normal">
                    / {ALL_BADGES.length}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium">Total Poin</p>
                <p className="text-2xl font-bold text-lime-600 flex items-center justify-end gap-1">
                  <ZapIcon className="w-5 h-5 fill-lime-500" /> {points}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ALL_BADGES.map((badge, idx) =>
              <motion.div
                key={badge.id}
                whileHover={
                badge.owned ?
                {
                  scale: 1.05,
                  y: -5
                } :
                {}
                }
                className={`relative p-4 rounded-2xl border text-center transition-all ${badge.owned ? 'bg-white border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer' : 'bg-slate-50 border-slate-200 opacity-60 grayscale'}`}>
                
                  {badge.owned && badge.rarity === 'epic' &&
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                      <FlameIcon className="w-3 h-3 text-white fill-white" />
                    </div>
                }
                  <div
                  className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${badge.owned ? 'bg-indigo-50' : 'bg-slate-200'}`}>
                  
                    {badge.icon}
                  </div>
                  <h4
                  className={`font-bold text-sm mb-1 ${badge.owned ? 'text-slate-800' : 'text-slate-500'}`}>
                  
                    {badge.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {badge.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

};