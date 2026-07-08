import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  PlusIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon } from
'lucide-react';
import { formatRp } from '../utils/formatters';
import { Modal } from '../components/ui/Modal';
type ReminderOption = 'H-14' | 'H-7' | 'H-3';
interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: 'Bulanan' | 'Semesteran';
  reminder: ReminderOption;
  status: 'paid' | 'unpaid';
}
const DUMMY_BILLS: Bill[] = [
{
  id: '1',
  name: 'Kos Bulan Ini',
  amount: 800000,
  dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
  frequency: 'Bulanan',
  reminder: 'H-3',
  status: 'unpaid'
},
{
  id: '2',
  name: 'Langganan Spotify',
  amount: 54900,
  dueDate: new Date(Date.now() + 86400000 * 12).toISOString(),
  frequency: 'Bulanan',
  reminder: 'H-7',
  status: 'unpaid'
},
{
  id: '3',
  name: 'UKT Semester Ganjil',
  amount: 4500000,
  dueDate: new Date(Date.now() + 86400000 * 45).toISOString(),
  frequency: 'Semesteran',
  reminder: 'H-14',
  status: 'unpaid'
},
{
  id: '4',
  name: 'Iuran Kas BEM',
  amount: 20000,
  dueDate: new Date(Date.now() - 86400000 * 5).toISOString(),
  frequency: 'Bulanan',
  reminder: 'H-3',
  status: 'paid'
}];

const REMINDER_OPTIONS: {
  value: ReminderOption;
  label: string;
}[] = [
{
  value: 'H-14',
  label: 'H-14'
},
{
  value: 'H-7',
  label: 'H-7'
},
{
  value: 'H-3',
  label: 'H-3'
}];

export const Reminder = () => {
  const [bills, setBills] = useState<Bill[]>(DUMMY_BILLS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Form state
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newFreq, setNewFreq] = useState<'Bulanan' | 'Semesteran'>('Bulanan');
  const [newReminder, setNewReminder] = useState<ReminderOption>('H-3');
  const resetForm = () => {
    setNewName('');
    setNewAmount('');
    setNewDate('');
    setNewFreq('Bulanan');
    setNewReminder('H-3');
  };
  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAmount || !newDate) return;
    const newBill: Bill = {
      id: Math.random().toString(),
      name: newName,
      amount: parseInt(newAmount.replace(/\D/g, '')),
      dueDate: new Date(newDate).toISOString(),
      frequency: newFreq,
      reminder: newReminder,
      status: 'unpaid'
    };
    setBills((prev) =>
    [...prev, newBill].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    );
    setIsAddModalOpen(false);
    resetForm();
  };
  const markAsPaid = (id: string) => {
    setBills((prev) =>
    prev.map((b) =>
    b.id === id ?
    {
      ...b,
      status: 'paid'
    } :
    b
    )
    );
  };
  const getDaysUntil = (dateString: string) => {
    const diff = new Date(dateString).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };
  const unpaidBills = bills.filter((b) => b.status === 'unpaid');
  const paidBills = bills.filter((b) => b.status === 'paid');
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Reminder Tagihan
          </h1>
          <p className="text-slate-500">
            Jangan sampai telat bayar kos atau UKT lagi.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2">
          
          <PlusIcon className="w-5 h-5" /> Tambah Tagihan
        </button>
      </div>

      {/* ACTIVE BILLS */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800">Tagihan Aktif</h3>

        {unpaidBills.map((bill, idx) => {
          const daysUntil = getDaysUntil(bill.dueDate);
          const isNear = daysUntil <= 3 && daysUntil >= 0;
          const isOverdue = daysUntil < 0;
          return (
            <motion.div
              key={bill.id}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: idx * 0.08
              }}
              className={`bg-white rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-shadow hover:shadow-md ${isOverdue ? 'border-red-200 bg-red-50/30' : isNear ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200'}`}>
              
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isOverdue ? 'bg-red-100 text-red-600' : isNear ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                  
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800">{bill.name}</h4>
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                      {bill.frequency}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                      <BellIcon className="w-3 h-3" /> Ingatkan {bill.reminder}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 mb-2">
                    {formatRp(bill.amount)}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    {isOverdue ?
                    <span className="text-red-600 flex items-center gap-1">
                        <AlertCircleIcon className="w-4 h-4" /> Terlewat{' '}
                        {Math.abs(daysUntil)} hari
                      </span> :
                    isNear ?
                    <span className="text-orange-600 flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" /> Jatuh tempo dalam{' '}
                        {daysUntil} hari
                      </span> :

                    <span className="text-slate-500">
                        Jatuh tempo:{' '}
                        {new Date(bill.dueDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long'
                      })}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <button
                onClick={() => markAsPaid(bill.id)}
                className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shrink-0">
                
                <CheckCircle2Icon className="w-5 h-5" /> Tandai Lunas
              </button>
            </motion.div>);

        })}

        {unpaidBills.length === 0 &&
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            <CheckCircle2Icon className="w-12 h-12 text-lime-500 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">
              Hore! Tidak ada tagihan aktif saat ini.
            </p>
          </div>
        }
      </div>

      {/* PAID HISTORY */}
      {paidBills.length > 0 &&
      <div className="space-y-3">
          <h3 className="font-bold text-lg text-slate-800">Riwayat Lunas</h3>
          <div className="space-y-3 opacity-70">
            {paidBills.map((bill) =>
          <div
            key={bill.id}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex justify-between items-center">
            
                <div>
                  <p className="font-medium text-slate-700 line-through">
                    {bill.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatRp(bill.amount)}
                  </p>
                </div>
                <CheckCircle2Icon className="w-5 h-5 text-lime-500" />
              </div>
          )}
          </div>
        </div>
      }

      {/* ADD BILL MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Tagihan Baru">
        
        <form onSubmit={handleAddBill} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Tagihan
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="UKT, kos, langganan streaming, iuran organisasi..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nominal
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                Rp
              </span>
              <input
                type="text"
                required
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tanggal Jatuh Tempo
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Frekuensi
              </label>
              <select
                value={newFreq}
                onChange={(e) => setNewFreq(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                
                <option value="Bulanan">Bulanan</option>
                <option value="Semesteran">Semesteran</option>
              </select>
            </div>
          </div>

          {/* Reminder choice — inline within the form */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1.5">
              <BellIcon className="w-4 h-4 text-indigo-600" /> Ingatkan saya
            </label>
            <div className="grid grid-cols-3 gap-2">
              {REMINDER_OPTIONS.map((opt) => {
                const active = newReminder === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setNewReminder(opt.value)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${active ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                    
                    {opt.label}
                  </button>);

              })}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Sebelum jatuh tempo, kami kirim notifikasi pada{' '}
              {newReminder.replace('H-', 'H-')}.
            </p>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-100 flex gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
              
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              
              Simpan Tagihan
            </button>
          </div>
        </form>
      </Modal>
    </div>);

};