import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MenuIcon,
  XIcon,
  WalletIcon,
  ChevronDownIcon,
  ZapIcon } from
'lucide-react';
import { useAppContext } from '../../context/AppContext';
const NAV_ITEMS = [
{
  path: '/',
  label: 'Beranda'
},
{
  path: '/dashboard',
  label: 'Dashboard'
},
{
  path: '/reminder',
  label: 'Reminder'
},
{
  path: '/kalkulator',
  label: 'Kalkulator'
},
{
  path: '/diskon',
  label: 'Diskon'
}];

const DROPDOWN_ITEMS = [
{
  path: '/edukasi',
  label: 'Edukasi'
},
{
  path: '/komunitas',
  label: 'Komunitas'
}];

export const Navbar = () => {
  const { isAuthenticated, user, isPremium, points } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node))
      {
        setIsDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);
  // Close dropdown when navigating
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/Desain_tanpa_judul_(4).png"
              alt="KantongKuliah"
              className="w-10 h-10 rounded-xl object-contain shadow-sm group-hover:scale-105 transition-transform" />
            
            <span className="font-bold text-xl text-slate-800 tracking-tight">
              Kantong<span className="text-indigo-600">Kuliah</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
              `relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              }>
              
                {({ isActive }) =>
              <>
                    {item.label}
                    {isActive &&
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }} />

                }
                  </>
              }
              </NavLink>
            )}

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((o) => !o)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isDropdownOpen || DROPDOWN_ITEMS.some((item) => location.pathname === item.path) ? 'text-indigo-600 bg-slate-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                
                Lainnya{' '}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                
              </button>

              <AnimatePresence>
                {isDropdownOpen &&
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
                  transition={{
                    duration: 0.15
                  }}
                  className="absolute top-full right-0 w-48 py-2 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 z-50">
                  
                    {DROPDOWN_ITEMS.map((item) =>
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    onClick={() => setIsDropdownOpen(false)}>
                    
                        {item.label}
                      </Link>
                  )}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ?
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold">
                  <ZapIcon className="w-4 h-4 fill-lime-500 text-lime-500" />
                  {points} Poin
                </div>
                <Link to="/profil" className="flex items-center gap-2 group">
                  <div className="relative">
                    <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                      {user?.name.charAt(0)}
                    </div>
                    {isPremium &&
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-500 rounded-full border-2 border-white flex items-center justify-center">
                        <ZapIcon className="w-2 h-2 text-white fill-white" />
                      </div>
                  }
                  </div>
                </Link>
              </div> :

            <div className="flex items-center gap-2">
                <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                
                  Masuk
                </Link>
                <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                
                  Daftar
                </Link>
              </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              
              {isMobileMenuOpen ?
              <XIcon className="w-6 h-6" /> :

              <MenuIcon className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          className="md:hidden overflow-hidden bg-white border-b border-slate-200">
          
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[...NAV_ITEMS, ...DROPDOWN_ITEMS].map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
              `block px-3 py-3 rounded-lg text-base font-medium ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`
              }>
              
                  {item.label}
                </NavLink>
            )}

              <div className="pt-4 mt-4 border-t border-slate-100">
                {isAuthenticated ?
              <div className="flex items-center justify-between px-3">
                    <Link
                  to="/profil"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3">
                  
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {isPremium ? 'Premium Member' : 'Free Member'}
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-1 px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-semibold">
                      <ZapIcon className="w-3 h-3 fill-lime-500 text-lime-500" />
                      {points}
                    </div>
                  </div> :

              <div className="grid grid-cols-2 gap-3 px-3">
                    <Link
                  to="/auth"
                  onClick={closeMobileMenu}
                  className="flex justify-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg">
                  
                      Masuk
                    </Link>
                    <Link
                  to="/auth"
                  onClick={closeMobileMenu}
                  className="flex justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                  
                      Daftar
                    </Link>
                  </div>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

};