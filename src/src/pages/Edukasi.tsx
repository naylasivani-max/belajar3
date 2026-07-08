import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  PlayCircleIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ExternalLinkIcon } from
'lucide-react';
const ARTICLES = [
{
  id: 1,
  type: 'article',
  category: 'Menabung',
  title: 'Cara Nabung dari Uang Saku Rp 50rb/Hari',
  readTime: '5 min read',
  image: 'bg-blue-100',
  icon: '💰'
},
{
  id: 2,
  type: 'video',
  category: 'Budgeting',
  title: 'Kebutuhan vs Keinginan: Jangan Sampai Tertukar!',
  duration: '3:45',
  image: 'bg-purple-100',
  icon: '⚖️'
},
{
  id: 3,
  type: 'article',
  category: 'Investasi Dasar',
  title: 'Panduan Reksadana Pasar Uang untuk Pemula',
  readTime: '8 min read',
  image: 'bg-emerald-100',
  icon: '📈'
},
{
  id: 4,
  type: 'infographic',
  category: 'Budgeting',
  title: 'Alokasi Budget 50/30/20 ala Mahasiswa',
  readTime: 'Infografis',
  image: 'bg-orange-100',
  icon: '📊'
},
{
  id: 5,
  type: 'sponsor',
  category: 'Rekomendasi Partner',
  title: 'Buka Rekening Mahasiswa Bebas Biaya Admin',
  sponsor: 'Bank Kampus',
  image: 'bg-indigo-100',
  icon: '🏦'
},
{
  id: 6,
  type: 'article',
  category: 'Menabung',
  title: 'Tips Bertahan Hidup di Akhir Bulan (Anak Kos Wajib Baca)',
  readTime: '6 min read',
  image: 'bg-red-100',
  icon: '🍜'
}];

const CATEGORIES = ['Semua', 'Menabung', 'Budgeting', 'Investasi Dasar'];
export const Edukasi = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const filteredArticles = ARTICLES.filter((art) =>
  activeCategory === 'Semua' ?
  true :
  art.category === activeCategory || art.type === 'sponsor'
  );
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
          <BookOpenIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Pusat Edukasi Finansial
        </h1>
        <p className="text-lg text-slate-600">
          Tingkatkan literasi keuanganmu dengan artikel, video singkat, dan tips
          praktis yang disesuaikan untuk kehidupan mahasiswa.
        </p>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto hide-scrollbar pb-2">
        {CATEGORIES.map((cat) =>
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
          
            {cat}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((item, idx) =>
        <motion.div
          key={item.id}
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
            duration: 0.4,
            delay: idx * 0.1
          }}
          className={`rounded-3xl overflow-hidden border flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-300 ${item.type === 'sponsor' ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-200 bg-white hover:shadow-xl'}`}>
          
            <div
            className={`h-48 ${item.image} relative flex items-center justify-center text-6xl`}>
            
              <motion.div
              group-hover={{
                scale: 1.1
              }}
              transition={{
                duration: 0.3
              }}>
              
                {item.icon}
              </motion.div>

              {item.type === 'video' &&
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircleIcon className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
            }

              <div className="absolute top-4 left-4">
                <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md ${item.type === 'sponsor' ? 'bg-indigo-600 text-white' : 'bg-white/80 text-slate-800'}`}>
                
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {item.type === 'sponsor' &&
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mb-2">
                  <ShieldCheckIcon className="w-4 h-4" /> SPONSOR:{' '}
                  {item.sponsor}
                </div>
            }

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {item.title}
              </h3>

              <div className="mt-auto pt-4 flex items-center justify-between text-sm text-slate-500 font-medium">
                {item.type === 'video' ?
              <span className="flex items-center gap-1">
                    <PlayCircleIcon className="w-4 h-4" /> {item.duration}
                  </span> :
              item.type === 'sponsor' ?
              <span className="flex items-center gap-1 text-indigo-600">
                    Pelajari Lebih Lanjut{' '}
                    <ExternalLinkIcon className="w-4 h-4" />
                  </span> :

              <span className="flex items-center gap-1">
                    <BookOpenIcon className="w-4 h-4" /> {item.readTime}
                  </span>
              }
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>);

};