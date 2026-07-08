import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalculatorIcon,
  TargetIcon,
  UsersIcon,
  MapPinIcon,
  ArrowRightIcon } from
'lucide-react';
import { CheckCircle2Icon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatRp } from '../utils/formatters';
export const Kalkulator = () => {
  const { addSavingsTarget } = useAppContext();
  const [activeTab, setActiveTab] = useState<'nabung' | 'split' | 'biaya'>(
    'nabung'
  );
  // Tab 1: Nabung State
  const [namaTarget, setNamaTarget] = useState('');
  const [hargaBarang, setHargaBarang] = useState('');
  const [nabungPerBulan, setNabungPerBulan] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const resetNabungForm = () => {
    setNamaTarget('');
    setHargaBarang('');
    setNabungPerBulan('');
  };
  const handleSaveTarget = () => {
    const target = parseInt(hargaBarang.replace(/\D/g, '')) || 0;
    const monthly = parseInt(nabungPerBulan.replace(/\D/g, '')) || 0;
    if (!namaTarget.trim() || target === 0 || monthly === 0) return;
    addSavingsTarget({
      name: namaTarget.trim(),
      targetAmount: target,
      monthlyAmount: monthly
    });
    resetNabungForm();
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };
  // Tab 2: Split Bill State
  const [jumlahPenghuni, setJumlahPenghuni] = useState('2');
  const [biayaListrik, setBiayaListrik] = useState('');
  const [biayaInternet, setBiayaInternet] = useState('');
  const [biayaGalon, setBiayaGalon] = useState('');
  // Tab 3: Biaya Hidup State
  const [selectedKota, setSelectedKota] = useState('Yogyakarta');
  const kotaData: Record<
    string,
    {
      kos: number;
      makan: number;
      transport: number;
    }> =
  {
    Jakarta: {
      kos: 1500000,
      makan: 1800000,
      transport: 500000
    },
    Bandung: {
      kos: 1000000,
      makan: 1200000,
      transport: 300000
    },
    Yogyakarta: {
      kos: 700000,
      makan: 900000,
      transport: 200000
    },
    Surabaya: {
      kos: 1200000,
      makan: 1500000,
      transport: 400000
    },
    Malang: {
      kos: 800000,
      makan: 1000000,
      transport: 250000
    },
    Semarang: {
      kos: 900000,
      makan: 1100000,
      transport: 300000
    }
  };
  const calculateNabung = () => {
    const harga = parseInt(hargaBarang.replace(/\D/g, '')) || 0;
    const nabung = parseInt(nabungPerBulan.replace(/\D/g, '')) || 0;
    if (harga === 0 || nabung === 0) return 0;
    return Math.ceil(harga / nabung);
  };
  const calculateSplit = () => {
    const listrik = parseInt(biayaListrik.replace(/\D/g, '')) || 0;
    const internet = parseInt(biayaInternet.replace(/\D/g, '')) || 0;
    const galon = parseInt(biayaGalon.replace(/\D/g, '')) || 0;
    const total = listrik + internet + galon;
    const penghuni = parseInt(jumlahPenghuni) || 1;
    return total / penghuni;
  };
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CalculatorIcon className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Kalkulator Cerdas Mahasiswa
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Hitung target nabung, bagi tagihan kos, atau estimasi biaya hidup di
          kota perantauan tanpa ribet. Gratis!
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* TABS */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-100 p-2 gap-2 bg-slate-50">
          {[
          {
            id: 'nabung',
            label: 'Target Nabung',
            icon: <TargetIcon className="w-4 h-4" />
          },
          {
            id: 'split',
            label: 'Split Bill Kos',
            icon: <UsersIcon className="w-4 h-4" />
          },
          {
            id: 'biaya',
            label: 'Estimasi Biaya',
            icon: <MapPinIcon className="w-4 h-4" />
          }].
          map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
            
              {activeTab === tab.id &&
            <motion.div
              layoutId="kalkulator-tab"
              className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200" />

            }
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon} {tab.label}
              </span>
            </button>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: NABUNG */}
            {activeTab === 'nabung' &&
            <motion.div
              key="nabung"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="grid md:grid-cols-2 gap-8">
              
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      Berapa Lama Nabung?
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Hitung estimasi waktu untuk beli barang impianmu.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Nama Barang / Tujuan
                        </label>
                        <input
                        type="text"
                        value={namaTarget}
                        onChange={(e) => setNamaTarget(e.target.value)}
                        placeholder="Laptop baru, Dana Darurat, Sepatu lari..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Harga Barang Impian
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                            Rp
                          </span>
                          <input
                          type="text"
                          value={hargaBarang}
                          onChange={(e) => setHargaBarang(e.target.value)}
                          placeholder="5.000.000"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Bisa Nabung per Bulan
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                            Rp
                          </span>
                          <input
                          type="text"
                          value={nabungPerBulan}
                          onChange={(e) => setNabungPerBulan(e.target.value)}
                          placeholder="500.000"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                      type="button"
                      onClick={handleSaveTarget}
                      disabled={
                      !namaTarget.trim() ||
                      !hargaBarang.trim() ||
                      !nabungPerBulan.trim()
                      }
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed">
                      
                        Simpan Target
                      </button>
                      <button
                      type="button"
                      onClick={resetNabungForm}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors">
                      
                        Batal
                      </button>
                    </div>

                    <AnimatePresence>
                      {savedFlash &&
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{
                        opacity: 0,
                        y: 8
                      }}
                      className="mt-4 flex items-center gap-2 bg-lime-50 text-lime-800 text-sm font-medium px-4 py-3 rounded-xl border border-lime-100">
                      
                          <CheckCircle2Icon className="w-4 h-4" />
                          Target tersimpan! Cek kartunya di Dashboard.
                        </motion.div>
                    }
                    </AnimatePresence>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-indigo-100">
                  <p className="text-indigo-600 font-medium mb-2">
                    Kamu butuh waktu sekitar
                  </p>
                  <div className="text-6xl font-extrabold text-indigo-900 mb-2">
                    {calculateNabung()}{' '}
                    <span className="text-2xl font-bold text-indigo-700">
                      Bulan
                    </span>
                  </div>
                  <p className="text-sm text-indigo-600/80 mt-4">
                    Tetap konsisten ya! Jangan lupa kurangi jajan yang tidak
                    perlu.
                  </p>
                </div>
              </motion.div>
            }

            {/* TAB 2: SPLIT BILL */}
            {activeTab === 'split' &&
            <motion.div
              key="split"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="grid md:grid-cols-2 gap-8">
              
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      Split Bill Kos Bersama
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Bagi rata tagihan bulanan dengan teman kosmu.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Jumlah Penghuni
                        </label>
                        <input
                        type="number"
                        min="1"
                        value={jumlahPenghuni}
                        onChange={(e) => setJumlahPenghuni(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Listrik
                          </label>
                          <input
                          type="text"
                          value={biayaListrik}
                          onChange={(e) => setBiayaListrik(e.target.value)}
                          placeholder="Rp"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Internet
                          </label>
                          <input
                          type="text"
                          value={biayaInternet}
                          onChange={(e) => setBiayaInternet(e.target.value)}
                          placeholder="Rp"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Galon / Lainnya
                        </label>
                        <input
                        type="text"
                        value={biayaGalon}
                        onChange={(e) => setBiayaGalon(e.target.value)}
                        placeholder="Rp"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-lime-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-lime-100">
                  <p className="text-lime-700 font-medium mb-2">
                    Masing-masing bayar
                  </p>
                  <div className="text-4xl font-extrabold text-lime-900 mb-2">
                    {formatRp(calculateSplit())}
                  </div>
                  <div className="w-full mt-6 pt-6 border-t border-lime-200/50">
                    <button className="w-full py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      Share ke WhatsApp <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            }

            {/* TAB 3: BIAYA HIDUP */}
            {activeTab === 'biaya' &&
            <motion.div
              key="biaya"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-8">
              
                <div className="max-w-md mx-auto text-center">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    Estimasi Biaya Hidup per Kota
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Pilih kota tujuan kuliahmu untuk melihat estimasi biaya
                    bulanan.
                  </p>

                  <select
                  value={selectedKota}
                  onChange={(e) => setSelectedKota(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-semibold text-center appearance-none cursor-pointer">
                  
                    {Object.keys(kotaData).map((kota) =>
                  <option key={kota} value={kota}>
                        {kota}
                      </option>
                  )}
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-300 transition-colors">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🏠
                    </div>
                    <p className="text-sm text-slate-500 mb-1">Kos (Standar)</p>
                    <p className="text-xl font-bold text-slate-800">
                      {formatRp(kotaData[selectedKota].kos)}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-orange-300 transition-colors">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🍜
                    </div>
                    <p className="text-sm text-slate-500 mb-1">
                      Makan (3x Sehari)
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      {formatRp(kotaData[selectedKota].makan)}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-emerald-300 transition-colors">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🛵
                    </div>
                    <p className="text-sm text-slate-500 mb-1">Transportasi</p>
                    <p className="text-xl font-bold text-slate-800">
                      {formatRp(kotaData[selectedKota].transport)}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-400 font-medium mb-1">
                      Total Estimasi per Bulan
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatRp(
                      kotaData[selectedKota].kos +
                      kotaData[selectedKota].makan +
                      kotaData[selectedKota].transport
                    )}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 max-w-xs text-right hidden sm:block">
                    *Estimasi ini adalah rata-rata gaya hidup mahasiswa standar.
                    Bisa lebih murah jika kamu masak sendiri!
                  </p>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>);

};