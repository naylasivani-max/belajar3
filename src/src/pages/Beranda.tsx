import React, { useState, cloneElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  WalletIcon,
  TrendingUpIcon,
  ShoppingBagIcon,
  CheckCircle2Icon,
  ZapIcon,
  ArrowRightIcon,
  BrainCircuitIcon,
  MessageSquareIcon,
  LayersIcon,
  DownloadIcon,
  TrophyIcon,
  TargetIcon,
  SparklesIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal } from '../components/ui/Modal';
export const Beranda = () => {
  const { isPremium, upgradeToPremium } = useAppContext();
  const navigate = useNavigate();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const handleUpgrade = () => {
    upgradeToPremium();
    setIsUpgradeModalOpen(true);
  };
  const closeAndRedirect = () => {
    setIsUpgradeModalOpen(false);
    navigate('/dashboard');
  };
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-lime-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-8">
            
            <SparklesIcon className="w-4 h-4" />
            <span>Aplikasi Keuangan #1 Mahasiswa Indonesia</span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            
            Uang saku habis sebelum akhir bulan?{' '}
            <br className="hidden md:block" />
            <span className="text-indigo-600">KantongKuliah</span> bantu kamu
            pegang kendali.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            
            Catat pengeluaran, dapatkan diskon merchant lokal, dan gabung
            komunitas mahasiswa hemat. Semua dalam satu aplikasi pintar.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Link
              to="/auth"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2">
              
              Mulai Gratis Sekarang <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/kalkulator"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold shadow-sm transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              
              Coba Kalkulator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3 PILLARS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              icon: <WalletIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Tracking Pintar',
              desc: 'Catat pengeluaran harian, set budget per kategori (UKT, Kos, Jajan), dan dapatkan notifikasi sebelum overbudget.',
              bg: 'bg-indigo-50'
            },
            {
              icon: <TrophyIcon className="w-8 h-8 text-lime-600" />,
              title: 'Komunitas Hemat',
              desc: 'Kumpulkan poin dari setiap misi hemat, buka badge achievement, dan bersaing di leaderboard kampusmu.',
              bg: 'bg-lime-50'
            },
            {
              icon: <ShoppingBagIcon className="w-8 h-8 text-pink-600" />,
              title: 'Marketplace Diskon',
              desc: 'Tukar poinmu dengan voucher diskon eksklusif di merchant lokal sekitar kampus (laundry, fotokopi, cafe).',
              bg: 'bg-pink-50'
            }].
            map((pillar, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1
              }}
              className="p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white group">
              
                <div
                className={`w-16 h-16 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Semua yang kamu butuhkan
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fitur lengkap yang didesain khusus untuk menjawab masalah keuangan
              mahasiswa sehari-hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            {
              title: 'Dashboard Keuangan',
              icon: <TrendingUpIcon />,
              path: '/dashboard',
              color: 'text-blue-600',
              bg: 'bg-blue-100'
            },
            {
              title: 'Reminder Tagihan',
              icon: <TargetIcon />,
              path: '/reminder',
              color: 'text-orange-600',
              bg: 'bg-orange-100'
            },
            {
              title: 'Kalkulator Split Bill',
              icon: <LayersIcon />,
              path: '/kalkulator',
              color: 'text-purple-600',
              bg: 'bg-purple-100'
            },
            {
              title: 'Edukasi Finansial',
              icon: <BrainCircuitIcon />,
              path: '/edukasi',
              color: 'text-emerald-600',
              bg: 'bg-emerald-100'
            }].
            map((feat, idx) =>
            <Link key={idx} to={feat.path}>
                <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1
                }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all group h-full flex flex-col">
                
                  <div
                  className={`w-12 h-12 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  
                    {cloneElement(feat.icon as React.ReactElement, {
                    className: 'w-6 h-6'
                  })}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h4>
                  <div className="mt-auto flex items-center text-sm font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">
                    Coba fitur{' '}
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* COMMUNITY PREVIEW */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="lg:w-1/2">
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Lebih seru nabung bareng{' '}
                <span className="text-lime-500">Komunitas</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Selesaikan challenge mingguan, kumpulkan badge unik, dan lihat
                posisimu di leaderboard kampus. Siapa bilang hemat itu
                membosankan?
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-lime-100 flex items-center justify-center">
                    🏆
                  </div>
                  <span className="font-medium text-slate-700">Kos Master</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    🍜
                  </div>
                  <span className="font-medium text-slate-700">
                    Pejuang Indomie
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    📚
                  </div>
                  <span className="font-medium text-slate-700">Buku Bekas</span>
                </div>
              </div>

              <Link
                to="/komunitas"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                
                Lihat Komunitas <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="lg:w-1/2 w-full">
              
              <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/20 rounded-full blur-3xl" />
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <TrophyIcon className="text-lime-400 w-6 h-6" /> Leaderboard
                  Minggu Ini
                </h3>
                <div className="space-y-4">
                  {[
                  {
                    rank: 1,
                    name: 'Budi S.',
                    points: 2450,
                    avatar: 'B'
                  },
                  {
                    rank: 2,
                    name: 'Rangga (Kamu)',
                    points: 1250,
                    avatar: 'R',
                    isMe: true
                  },
                  {
                    rank: 3,
                    name: 'Siti A.',
                    points: 980,
                    avatar: 'S'
                  }].
                  map((user) =>
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-xl ${user.isMe ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-slate-800'}`}>
                    
                      <div className="flex items-center gap-4">
                        <span
                        className={`font-bold ${user.rank === 1 ? 'text-yellow-400' : 'text-slate-400'}`}>
                        
                          #{user.rank}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                          {user.avatar}
                        </div>
                        <span
                        className={`font-medium ${user.isMe ? 'text-white' : 'text-slate-300'}`}>
                        
                          {user.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-lime-400 font-semibold">
                        <ZapIcon className="w-4 h-4 fill-lime-400" />{' '}
                        {user.points}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM CTA SECTION */}
      <section className="py-24 bg-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-600/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Buka Kekuatan Penuh AI
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
              Tingkatkan ke Premium untuk mendapatkan asisten keuangan pribadi,
              prediksi masa depan, dan manajemen dompet tanpa batas.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">Gratis</h3>
              <p className="text-indigo-200 mb-6">
                Untuk mulai mencatat & berhemat
              </p>
              <div className="text-4xl font-bold text-white mb-8">
                Rp 0
                <span className="text-lg font-normal text-indigo-300">
                  /bulan
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                'Tracking pengeluaran dasar',
                '1 Dompet utama',
                'Akses marketplace diskon',
                'Kalkulator standar',
                'Komunitas & Leaderboard'].
                map((feat, i) =>
                <li
                  key={i}
                  className="flex items-start gap-3 text-indigo-100">
                  
                    <CheckCircle2Icon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                )}
              </ul>
              <button
                disabled
                className="w-full py-4 rounded-xl font-semibold bg-white/5 text-white/50 cursor-not-allowed border border-white/10">
                
                Paket Saat Ini
              </button>
            </div>

            {/* Premium Tier */}
            <div className="flex-1 bg-white rounded-3xl p-8 border-4 border-lime-400 shadow-2xl relative transform lg:-translate-y-4">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-lime-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                Paling Populer
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Premium AI
              </h3>
              <p className="text-slate-600 mb-6">
                Asisten cerdas untuk masa depanmu
              </p>

              <div className="flex items-center gap-4 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
                  
                  Bulanan
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
                  
                  Tahunan <span className="text-lime-600 ml-1">-20%</span>
                </button>
              </div>

              <div className="mb-8">
                {billingCycle === 'monthly' ?
                <div className="text-4xl font-bold text-slate-900">
                    Rp 15.000
                    <span className="text-lg font-normal text-slate-500">
                      /bulan
                    </span>
                  </div> :

                <>
                    <div className="text-4xl font-bold text-slate-900">
                      Rp 144.000
                      <span className="text-lg font-normal text-slate-500">
                        /tahun
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Setara Rp 12.000/bulan •{' '}
                      <span className="text-lime-600 font-semibold">
                        hemat Rp 36.000
                      </span>
                    </p>
                  </>
                }
              </div>

              <ul className="space-y-4 mb-8">
                {[
                {
                  text: 'AI Financial Forecast & Simulasi',
                  icon:
                  <TrendingUpIcon className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />

                },
                {
                  text: 'AI Chat Assistant Personal',
                  icon:
                  <MessageSquareIcon className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />

                },
                {
                  text: 'Multi-Wallet (Dompet tak terbatas)',
                  icon:
                  <WalletIcon className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />

                },
                {
                  text: 'Export Laporan PDF/Excel',
                  icon:
                  <DownloadIcon className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />

                },
                {
                  text: 'Auto-Saving Planner',
                  icon:
                  <TargetIcon className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />

                }].
                map((feat, i) =>
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-700 font-medium">
                  
                    {feat.icon}
                    <span>{feat.text}</span>
                  </li>
                )}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={isPremium}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isPremium ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-1 hover:shadow-indigo-200'}`}>
                
                {isPremium ? 'Sudah Premium' : 'Upgrade Sekarang'}{' '}
                <ZapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={closeAndRedirect}
        maxWidth="sm">
        
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                bounce: 0.5,
                delay: 0.2
              }}>
              
              <ZapIcon className="w-10 h-10 text-lime-600 fill-lime-500" />
            </motion.div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Upgrade Berhasil!
          </h3>
          <p className="text-slate-600 mb-8">
            Selamat! Akun kamu sekarang Premium. Semua fitur AI dan Multi-Wallet
            sudah terbuka.
          </p>
          <button
            onClick={closeAndRedirect}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors">
            
            Mulai Eksplorasi
          </button>
        </div>
      </Modal>
    </div>);

};