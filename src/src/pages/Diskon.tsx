import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  MapPinIcon,
  ZapIcon,
  StarIcon,
  SearchIcon,
  FilterIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal } from '../components/ui/Modal';
const PROMOS = [
{
  id: 1,
  merchant: 'Kopi Kenangan',
  category: 'Jajan',
  title: 'Diskon 20% All Varian',
  points: 150,
  distance: '0.5 km',
  rating: 4.8,
  image: 'bg-orange-100',
  icon: '☕'
},
{
  id: 2,
  merchant: 'Clean&Go Laundry',
  category: 'Laundry',
  title: 'Gratis 1Kg Cuci Kering',
  points: 200,
  distance: '1.2 km',
  rating: 4.9,
  image: 'bg-blue-100',
  icon: '👕'
},
{
  id: 3,
  merchant: 'Warteg Bahari',
  category: 'Makan',
  title: 'Paket Hemat Mahasiswa Rp 15rb',
  points: 100,
  distance: '0.3 km',
  rating: 4.5,
  image: 'bg-red-100',
  icon: '🍛'
},
{
  id: 4,
  merchant: 'Fotokopi Berkah',
  category: 'Fotokopi',
  title: 'Print >100 Lembar Diskon 15%',
  points: 50,
  distance: '0.8 km',
  rating: 4.7,
  image: 'bg-slate-100',
  icon: '📄'
},
{
  id: 5,
  merchant: 'Gojek',
  category: 'Transport',
  title: 'Voucher Goride Rp 5.000',
  points: 300,
  distance: 'Online',
  rating: 4.9,
  image: 'bg-green-100',
  icon: '🛵'
},
{
  id: 6,
  merchant: 'Ibu Kos',
  category: 'Kos',
  title: 'Cashback Bayar Kos Tepat Waktu',
  points: 500,
  distance: '0.0 km',
  rating: 5.0,
  image: 'bg-indigo-100',
  icon: '🏠'
}];

const CATEGORIES = [
'Semua',
'Jajan',
'Makan',
'Laundry',
'Fotokopi',
'Transport'];

export const Diskon = () => {
  const { points, transactions } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromo, setSelectedPromo] = useState<(typeof PROMOS)[0] | null>(
    null
  );
  // Determine recommended category based on highest transaction count
  const categoryCounts = transactions.reduce(
    (acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  let recommendedCategory = 'Jajan';
  let maxCount = 0;
  for (const [cat, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      recommendedCategory = cat;
    }
  }
  const filteredPromos = PROMOS.filter((promo) => {
    const matchesCategory =
    activeCategory === 'Semua' || promo.category === activeCategory;
    const matchesSearch =
    promo.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER & POINTS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Marketplace Diskon
          </h1>
          <p className="text-slate-400">
            Tukar poin hematmu dengan voucher merchant lokal sekitar kampus.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 min-w-[250px]">
          <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-slate-900 fill-slate-900" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">Poin Hematmu</p>
            <p className="text-2xl font-bold text-white">
              {points}{' '}
              <span className="text-sm font-normal text-slate-400">pts</span>
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari merchant atau promo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" />
          
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-600 mr-2">
            <FilterIcon className="w-4 h-4" /> Filter
          </div>
          {CATEGORIES.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            
              {cat}
            </button>
          )}
        </div>
      </div>

      {/* PROMO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromos.map((promo, idx) =>
        <motion.div
          key={promo.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4,
            delay: idx * 0.1
          }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
          
            <div
            className={`h-32 ${promo.image} relative flex items-center justify-center text-5xl`}>
            
              {promo.icon}
              {promo.category === recommendedCategory &&
            <div className="absolute top-3 left-3 bg-lime-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <StarIcon className="w-3 h-3 fill-slate-900" />{' '}
                  Direkomendasikan
                </div>
            }
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wider">
                    {promo.category}
                  </p>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    {promo.merchant}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500" />{' '}
                  {promo.rating}
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">{promo.title}</p>

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPinIcon className="w-4 h-4" /> {promo.distance}
                </div>
                <button
                onClick={() => setSelectedPromo(promo)}
                className="flex items-center gap-1.5 bg-lime-100 hover:bg-lime-200 text-lime-800 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                
                  <ZapIcon className="w-4 h-4 fill-lime-600 text-lime-600" />{' '}
                  {promo.points} pts
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {filteredPromos.length === 0 &&
      <div className="text-center py-20">
          <ShoppingBagIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            Promo tidak ditemukan
          </h3>
          <p className="text-slate-500">
            Coba ubah kata kunci pencarian atau filter kategori.
          </p>
        </div>
      }

      {/* CLAIM MODAL */}
      <Modal
        isOpen={!!selectedPromo}
        onClose={() => setSelectedPromo(null)}
        maxWidth="sm">
        
        {selectedPromo &&
        <div className="text-center">
            <div
            className={`w-20 h-20 ${selectedPromo.image} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4`}>
            
              {selectedPromo.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {selectedPromo.merchant}
            </h3>
            <p className="text-slate-600 mb-6">{selectedPromo.title}</p>

            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Poin dibutuhkan</span>
                <span className="font-bold text-slate-800">
                  {selectedPromo.points} pts
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Poin kamu saat ini</span>
                <span className="font-bold text-lime-600">{points} pts</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
                <span className="text-slate-500">Sisa poin setelah klaim</span>
                <span className="font-bold text-slate-800">
                  {points - selectedPromo.points} pts
                </span>
              </div>
            </div>

            <button
            disabled={points < selectedPromo.points}
            onClick={() => {
              alert('Simulasi: Voucher berhasil diklaim!');
              setSelectedPromo(null);
            }}
            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${points >= selectedPromo.points ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            
              {points >= selectedPromo.points ?
            'Klaim Voucher Sekarang' :
            'Poin Tidak Cukup'}
            </button>
            <button
            onClick={() => setSelectedPromo(null)}
            className="w-full py-3 mt-2 text-slate-500 font-medium hover:text-slate-700 transition-colors">
            
              Batal
            </button>
          </div>
        }
      </Modal>
    </div>);

};