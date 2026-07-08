import React, {
  useEffect,
  useState,
  useRef,
  cloneElement,
  createElement } from
'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WalletIcon,
  PlusIcon,
  AlertCircleIcon,
  TrophyIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  DownloadIcon,
  LockIcon,
  ZapIcon,
  ScanIcon,
  LinkIcon,
  UsersIcon,
  ChevronRightIcon,
  SendIcon,
  TargetIcon,
  PiggyBankIcon } from
'lucide-react';
import {
  useAppContext,
  TransactionCategory,
  INCOME_CATEGORIES } from
'../context/AppContext';
import { formatRp, formatDate } from '../utils/formatters';
import { ForecastChart } from '../components/dashboard/ForecastChart';
export const Dashboard = () => {
  const {
    user,
    isPremium,
    balance,
    budgets,
    transactions,
    addTransaction,
    savingsTargets,
    removeSavingsTarget,
    addToSavingsTarget
  } = useAppContext();
  const [activePremiumTab, setActivePremiumTab] = useState<
    'forecast' | 'chat' | 'wallet' | 'export'>(
    'forecast');
  const premiumSectionRef = useRef<HTMLDivElement>(null);
  const transactionSectionRef = useRef<HTMLDivElement>(null);
  // Form state
  const [txType, setTxType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<string>('Jajan');
  const [incomeCategory, setIncomeCategory] = useState<string>('Uang Saku');
  const [linkedTargetId, setLinkedTargetId] = useState<string>('');
  // Chat state (Premium)
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    {
      role: 'user' | 'ai';
      text: string;
    }[]>(
    [
    {
      role: 'ai',
      text: 'Halo Rangga! Aku asisten keuangan AI-mu. Ada yang bisa kubantu soal pengeluaran bulan ini?'
    }]
  );
  const [isTyping, setIsTyping] = useState(false);
  // Forecast state (Premium)
  const [coffeeReduction, setCoffeeReduction] = useState(0);
  // Multi-Wallet state (Premium)
  const [wallets, setWallets] = useState([
  {
    id: 'w1',
    name: 'Dompet Utama',
    balance: 1500000,
    account: '12345678',
    phone: '081234567890',
    color: 'indigo'
  },
  {
    id: 'w2',
    name: 'Tabungan Darurat',
    balance: 500000,
    account: '98761234',
    phone: '081298765432',
    color: 'emerald'
  },
  {
    id: 'w3',
    name: 'Dana Jajan',
    balance: 250000,
    account: '55512340',
    phone: '081255500127',
    color: 'orange'
  }]
  );
  const [transferFrom, setTransferFrom] = useState('w1');
  const [transferTo, setTransferTo] = useState('w2');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferFlash, setTransferFlash] = useState('');
  const maskAccount = (acc: string) =>
  acc.length <= 4 ? acc : `•••• ${acc.slice(-4)}`;
  const maskPhone = (p: string) =>
  p.length <= 6 ? p : `${p.slice(0, 4)}••••${p.slice(-3)}`;
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(transferAmount.replace(/\D/g, '')) || 0;
    if (amt <= 0 || transferFrom === transferTo) return;
    const source = wallets.find((w) => w.id === transferFrom);
    if (!source || source.balance < amt) {
      setTransferFlash('Saldo dompet sumber tidak cukup.');
      setTimeout(() => setTransferFlash(''), 2500);
      return;
    }
    setWallets((prev) =>
    prev.map((w) =>
    w.id === transferFrom ?
    {
      ...w,
      balance: w.balance - amt
    } :
    w.id === transferTo ?
    {
      ...w,
      balance: w.balance + amt
    } :
    w
    )
    );
    setTransferAmount('');
    setTransferFlash('Transfer berhasil! (simulasi)');
    setTimeout(() => setTransferFlash(''), 2500);
  };
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !merchant) return;
    const numericAmount = parseInt(amount.replace(/\D/g, '')) || 0;
    if (numericAmount <= 0) return;
    const isIncome = txType === 'income';
    const usedCategory = isIncome ? incomeCategory : category;
    const isTransferTabungan =
    isIncome && incomeCategory === 'Transfer Tabungan' && !!linkedTargetId;
    addTransaction({
      amount: numericAmount,
      merchant,
      category: usedCategory,
      date: new Date().toISOString(),
      type: isIncome ? 'income' : 'expense',
      targetId: isTransferTabungan ? linkedTargetId : undefined
    });
    // Auto-Saving Planner: route transfer to the chosen active target
    if (isTransferTabungan) {
      addToSavingsTarget(linkedTargetId, numericAmount);
    }
    setAmount('');
    setMerchant('');
    setLinkedTargetId('');
  };
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = chatInput;
    setChatMessages((prev) => [
    ...prev,
    {
      role: 'user',
      text: newMsg
    }]
    );
    setChatInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        text: `Berdasarkan datamu, pengeluaran terbesarmu ada di kategori Kos dan Jajan. Kalau kamu kurangi jajan kopi 2x seminggu, kamu bisa hemat Rp 200.000 bulan ini!`
      }]
      );
    }, 1500);
  };
  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], {
      type: mime
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleExport = (format: 'pdf' | 'excel') => {
    const rows = transactions.map(
      (t) =>
      `${formatDate(t.date)},${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'},${t.category},${t.merchant},${t.amount}`
    );
    if (format === 'excel') {
      const csv = `Tanggal,Jenis,Kategori,Keterangan,Nominal\n${rows.join('\n')}`;
      downloadFile(csv, 'laporan-kantongkuliah.csv', 'text/csv;charset=utf-8;');
    } else {
      const txt = `LAPORAN KEUANGAN — KantongKuliah\nNama: ${user?.name}\nPemasukan bulan ini: ${formatRp(totalIncome)}\nPengeluaran bulan ini: ${formatRp(totalExpense)}\nSaldo bersih: ${formatRp(netBalance)}\n\nRIWAYAT TRANSAKSI\n${rows.join('\n')}\n`;
      downloadFile(txt, 'laporan-kantongkuliah.pdf', 'application/pdf');
    }
  };
  const scrollToPremium = () => {
    premiumSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToTransaction = () => {
    transactionSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  // Calculate monthly totals (this calendar month)
  const now = new Date();
  const isThisMonth = (d: string) => {
    const dt = new Date(d);
    return (
      dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear());

  };
  const totalExpense = transactions.
  filter((t) => t.type === 'expense' && isThisMonth(t.date)).
  reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.
  filter((t) => t.type === 'income' && isThisMonth(t.date)).
  reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;
  // Expense breakdown by category (for AI Forecast chart) from recorded data
  const expenseByCategory = Object.values(
    transactions.
    filter((t) => t.type === 'expense').
    reduce(
      (acc, t) => {
        acc[t.category] = acc[t.category] || {
          category: t.category,
          total: 0
        };
        acc[t.category].total += t.amount;
        return acc;
      },
      {} as Record<
        string,
        {
          category: string;
          total: number;
        }>

    )
  ).sort((a, b) => b.total - a.total);
  const maxCategoryExpense = expenseByCategory.reduce(
    (m, c) => Math.max(m, c.total),
    0
  );
  // ---- AI Financial Forecast (real-time from recorded transactions) ----
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const todayDay = now.getDate();
  // daily expense map for current month
  const dailyExpense: number[] = Array(daysInMonth + 1).fill(0);
  transactions.
  filter((t) => t.type === 'expense' && isThisMonth(t.date)).
  forEach((t) => {
    const d = new Date(t.date).getDate();
    dailyExpense[d] += t.amount;
  });
  // cumulative actual up to today
  const actualCumulative: number[] = [];
  let runningTotal = 0;
  for (let d = 1; d <= todayDay; d++) {
    runningTotal += dailyExpense[d];
    actualCumulative.push(runningTotal);
  }
  const actualTotal = runningTotal;
  const dailyAvg = todayDay > 0 ? actualTotal / todayDay : 0;
  // scenario savings from the slider (kurangi jajan kopi)
  const scenarioSavings = coffeeReduction * 25000 * 4;
  // projected cumulative from today..end of month
  const projectedCumulative: number[] = [];
  for (let d = todayDay; d <= daysInMonth; d++) {
    const projected = actualTotal + dailyAvg * (d - todayDay);
    projectedCumulative.push(
      Math.max(
        0,
        projected -
        scenarioSavings * (
        (d - todayDay) / Math.max(1, daysInMonth - todayDay))
      )
    );
  }
  const predictedEndOfMonth = Math.max(
    0,
    actualTotal + dailyAvg * (daysInMonth - todayDay) - scenarioSavings
  );
  // total monthly budget = sum of budget limits
  const budgetLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const overBudget = predictedEndOfMonth - budgetLimit;
  const chartMax = Math.max(predictedEndOfMonth, budgetLimit) * 1.1 || 1;
  // Build SVG points (viewBox 0..100 x, 0..100 y inverted)
  const toX = (dayIndex: number) =>
  daysInMonth > 1 ? dayIndex / (daysInMonth - 1) * 100 : 0;
  const toY = (val: number) => 100 - val / chartMax * 100;
  const actualPoints = actualCumulative.
  map((v, i) => `${toX(i).toFixed(2)},${toY(v).toFixed(2)}`).
  join(' ');
  const projectedPoints = projectedCumulative.
  map((v, i) => `${toX(todayDay - 1 + i).toFixed(2)},${toY(v).toFixed(2)}`).
  join(' ');
  const budgetY = toY(budgetLimit);
  // Combined per-day data for the recharts forecast chart
  const forecastData = Array.from(
    {
      length: daysInMonth
    },
    (_, idx) => {
      const day = idx + 1;
      const actual =
      day <= todayDay ? actualCumulative[day - 1] ?? null : null;
      const forecast =
      day >= todayDay ? projectedCumulative[day - todayDay] ?? null : null;
      return {
        day,
        actual,
        forecast
      };
    }
  );
  // Find category with highest budget usage percentage
  const highestUsageBudget = budgets.reduce((prev, current) => {
    return current.spent / current.limit > prev.spent / prev.limit ?
    current :
    prev;
  });
  const highestUsagePercent = Math.round(
    highestUsageBudget.spent / highestUsageBudget.limit * 100
  );
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER & ALERTS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Halo, {user?.name}! 👋
          </h1>
          <p className="text-slate-500">
            Berikut ringkasan keuanganmu hari ini.
          </p>
        </div>

        {!isPremium &&
        <button
          onClick={scrollToPremium}
          className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors">
          
            <SparklesIcon className="w-4 h-4" />
            Buka fitur AI Forecast & Chat Assistant
          </button>
        }
      </div>

      {highestUsagePercent >= 70 &&
      <motion.div
        initial={{
          opacity: 0,
          y: -10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
        
          <AlertCircleIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-orange-800 font-semibold text-sm">
              Peringatan Budget
            </h4>
            <p className="text-orange-700 text-sm mt-1">
              {highestUsagePercent}% budget {highestUsageBudget.category} sudah
              terpakai. Hati-hati overbudget!
            </p>
          </div>
        </motion.div>
      }

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saldo Card */}
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <p className="text-indigo-100 font-medium mb-1">Total Saldo Aktif</p>
          <h2 className="text-3xl font-bold mb-6">{formatRp(balance)}</h2>
          <div className="flex gap-3">
            <button
              onClick={scrollToTransaction}
              className="flex-1 bg-white text-indigo-600 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              
              <PlusIcon className="w-4 h-4" /> Catat
            </button>
            <button className="flex-1 bg-indigo-500 text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-indigo-400 transition-colors">
              <ScanIcon className="w-4 h-4" /> Scan
            </button>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Sisa Budget Bulan Ini</h3>
            <Link
              to="/kalkulator"
              className="text-sm text-indigo-600 font-medium hover:underline">
              
              Atur Budget
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgets.slice(0, 4).map((budget) => {
              const percent = Math.min(100, budget.spent / budget.limit * 100);
              const isWarning = percent >= 80;
              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {budget.category}
                    </span>
                    <span className="text-slate-500">
                      {formatRp(budget.limit - budget.spent)} sisa
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${percent}%`
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut'
                      }}
                      className={`h-full rounded-full ${isWarning ? 'bg-orange-500' : 'bg-lime-500'}`} />
                    
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>

      {/* COMMUNITY PREVIEW */}
      <div className="bg-gradient-to-r from-lime-50 to-emerald-50 rounded-2xl p-4 border border-lime-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <TrophyIcon className="w-6 h-6 text-lime-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">
              Kartu Apresiasi Bulan Lalu
            </h4>
            <p className="text-sm text-slate-600">
              Kamu berhasil hemat Rp 150.000 dari budget jajan!
            </p>
          </div>
        </div>
        <Link
          to="/komunitas"
          className="px-4 py-2 bg-white text-lime-700 text-sm font-semibold rounded-xl border border-lime-200 hover:bg-lime-100 transition-colors whitespace-nowrap">
          
          Lihat Detail
        </Link>
      </div>

      {/* TARGET NABUNG AKTIF */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <PiggyBankIcon className="w-5 h-5 text-lime-600" /> Target Nabung
            Aktif
          </h3>
          <Link
            to="/kalkulator"
            className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors flex items-center gap-1 group">
            
            <PlusIcon className="w-4 h-4" /> Tambah Target
          </Link>
        </div>

        {savingsTargets.length === 0 ?
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center">
            <TargetIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium mb-1">
              Belum ada target nabung
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Buat target di Kalkulator dan pantau progresnya di sini.
            </p>
            <Link
            to="/kalkulator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-semibold text-sm hover:bg-indigo-100 transition-colors">
            
              Buat Target Pertama <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savingsTargets.map((t, idx) => {
            const progress = Math.min(
              100,
              Math.round(t.saved / t.targetAmount * 100)
            );
            const remaining = Math.max(0, t.targetAmount - t.saved);
            const monthsLeft =
            t.monthlyAmount > 0 ? Math.ceil(remaining / t.monthlyAmount) : 0;
            return (
              <motion.div
                key={t.id}
                initial={{
                  opacity: 0,
                  y: 12
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: idx * 0.08
                }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-lime-50 flex items-center justify-center text-lg">
                        🎯
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 leading-tight">
                          {t.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Target {formatRp(t.targetAmount)}
                        </p>
                      </div>
                    </div>
                    <button
                    onClick={() => removeSavingsTarget(t.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Hapus target ${t.name}`}>
                    
                      <PlusIcon className="w-4 h-4 rotate-45" />
                    </button>
                  </div>

                  <div className="mb-2 flex justify-between text-xs font-medium">
                    <span className="text-slate-500">
                      {formatRp(t.saved)} terkumpul
                    </span>
                    <span className="text-lime-700">{progress}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${progress}%`
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut'
                    }}
                    className="h-full rounded-full bg-lime-500" />
                  
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Nabung {formatRp(t.monthlyAmount)}/bln
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {monthsLeft > 0 ?
                    `± ${monthsLeft} bulan lagi` :
                    'Tercapai! 🎉'}
                    </span>
                  </div>
                </motion.div>);

          })}
          </div>
        }
      </div>

      {/* MAIN CONTENT GRID */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        ref={transactionSectionRef}>
        
        {/* LEFT COLUMN: TRANSACTIONS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-6">
              Catat Transaksi
            </h3>

            {/* Type toggle */}
            <div className="relative flex p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setTxType('expense')}
                className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors z-10 ${txType === 'expense' ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'}`}>
                
                {txType === 'expense' &&
                <motion.div
                  layoutId="txtype-indicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10" />

                }
                Uang Keluar
              </button>
              <button
                type="button"
                onClick={() => setTxType('income')}
                className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors z-10 ${txType === 'income' ? 'text-lime-700' : 'text-slate-500 hover:text-slate-700'}`}>
                
                {txType === 'income' &&
                <motion.div
                  layoutId="txtype-indicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10" />

                }
                Uang Masuk
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Nominal
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Kategori
                  </label>
                  {txType === 'expense' ?
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                    
                      {budgets.map((b) =>
                    <option key={b.category} value={b.category}>
                          {b.category}
                        </option>
                    )}
                    </select> :

                  <select
                    value={incomeCategory}
                    onChange={(e) => setIncomeCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                    
                      {INCOME_CATEGORIES.map((c) =>
                    <option key={c} value={c}>
                          {c}
                        </option>
                    )}
                    </select>
                  }
                </div>
              </div>

              {/* Auto-Saving Planner: link a Transfer Tabungan income to a target */}
              {txType === 'income' &&
              incomeCategory === 'Transfer Tabungan' &&
              savingsTargets.length > 0 &&
              <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Tujukan ke Target Nabung
                    </label>
                    <select
                  value={linkedTargetId}
                  onChange={(e) => setLinkedTargetId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-lime-50 border border-lime-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all">
                  
                      <option value="">Pilih target (opsional)</option>
                      {savingsTargets.map((t) =>
                  <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                  )}
                    </select>
                    {linkedTargetId &&
                <p className="text-xs text-lime-700 mt-1.5 flex items-center gap-1">
                        <PiggyBankIcon className="w-3.5 h-3.5" /> Progress
                        target otomatis bertambah sesuai nominal.
                      </p>
                }
                  </div>
              }

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {txType === 'income' ?
                  'Sumber / Keterangan' :
                  'Merchant / Keterangan'}
                </label>
                <input
                  type="text"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  placeholder={
                  txType === 'income' ?
                  'Contoh: Kiriman Ortu, Gaji Part-time...' :
                  'Contoh: Indomaret, Ibu Kos...'
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className={`flex-1 text-white py-2.5 rounded-xl font-semibold transition-colors ${txType === 'income' ? 'bg-lime-600 hover:bg-lime-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                  
                  {txType === 'income' ?
                  'Catat Pemasukan' :
                  'Catat Pengeluaran'}
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
                  
                  <LinkIcon className="w-4 h-4" /> E-Wallet
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
                  
                  <UsersIcon className="w-4 h-4" /> Split
                </button>
              </div>
            </form>

            {/* Monthly summary: income, expense, net */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-lime-50 border border-lime-100 rounded-xl p-3">
                <p className="text-[11px] font-medium text-lime-700 mb-0.5">
                  Pemasukan
                </p>
                <p className="text-sm font-bold text-lime-800 leading-tight">
                  {formatRp(totalIncome)}
                </p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <p className="text-[11px] font-medium text-red-600 mb-0.5">
                  Pengeluaran
                </p>
                <p className="text-sm font-bold text-red-700 leading-tight">
                  {formatRp(totalExpense)}
                </p>
              </div>
              <div
                className={`rounded-xl p-3 border ${netBalance >= 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-orange-50 border-orange-100'}`}>
                
                <p
                  className={`text-[11px] font-medium mb-0.5 ${netBalance >= 0 ? 'text-indigo-700' : 'text-orange-600'}`}>
                  
                  Saldo Bersih
                </p>
                <p
                  className={`text-sm font-bold leading-tight ${netBalance >= 0 ? 'text-indigo-900' : 'text-orange-700'}`}>
                  
                  {netBalance >= 0 ? '' : '-'}
                  {formatRp(Math.abs(netBalance))}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800">Riwayat Terakhir</h4>
              <span className="text-xs text-slate-400">Bulan ini</span>
            </div>

            <div className="space-y-3">
              {transactions.slice(0, 6).map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isIncome ? 'bg-lime-50' : 'bg-slate-100'}`}>
                        
                        {isIncome ?
                        tx.category === 'Transfer Tabungan' ?
                        '🐷' :
                        '💸' :
                        tx.category === 'Jajan' ?
                        '🍔' :
                        tx.category === 'Kos' ?
                        '🏠' :
                        tx.category === 'Transport' ?
                        '🛵' :
                        '📝'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {tx.merchant}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(tx.date)} • {tx.category}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${isIncome ? 'text-lime-600' : 'text-red-500'}`}>
                      
                      {isIncome ? '+' : '-'}
                      {formatRp(tx.amount)}
                    </span>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREMIUM FEATURES */}
        <div className="lg:col-span-5" ref={premiumSectionRef}>
          <div
            className={`bg-white rounded-3xl border ${isPremium ? 'border-lime-300 shadow-lg shadow-lime-100/50' : 'border-slate-200'} overflow-hidden h-full flex flex-col`}>
            
            {/* Header */}
            <div
              className={`p-4 border-b ${isPremium ? 'bg-lime-50 border-lime-100' : 'bg-slate-50 border-slate-100'} flex items-center justify-between`}>
              
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <SparklesIcon
                  className={`w-5 h-5 ${isPremium ? 'text-lime-600' : 'text-indigo-600'}`} />
                
                {isPremium ? 'Fitur Premium Aktif' : 'Buka Fitur Lebih Lanjut'}
              </h3>
              {isPremium &&
              <span className="px-2 py-1 bg-lime-200 text-lime-800 text-xs font-bold rounded-md uppercase tracking-wide">
                  PRO
                </span>
              }
            </div>

            {!isPremium /* LOCKED STATE */ ?
            <div className="p-6 space-y-4">
                {[
              {
                title: 'AI Financial Forecast',
                desc: 'Prediksi sisa uang di akhir bulan',
                icon: <TrendingUpIcon />
              },
              {
                title: 'AI Chat Assistant',
                desc: 'Konsultasi keuangan personal',
                icon: <MessageSquareIcon />
              },
              {
                title: 'Multi-Wallet',
                desc: 'Kelola banyak dompet/rekening',
                icon: <WalletIcon />
              },
              {
                title: 'Export Laporan',
                desc: 'Download PDF/Excel',
                icon: <DownloadIcon />
              }].
              map((feat, idx) =>
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-4">
                
                    <div className="flex items-center gap-3 opacity-40 blur-[1px]">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                        {cloneElement(feat.icon as React.ReactElement, {
                      className: 'w-5 h-5'
                    })}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-slate-500">{feat.desc}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                    to="/"
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md flex items-center gap-2">
                    
                        <LockIcon className="w-4 h-4" /> Upgrade
                      </Link>
                    </div>
                  </div>
              )}
                <div className="pt-4">
                  <Link
                  to="/"
                  className="w-full block text-center py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors">
                  
                    Lihat Paket Premium
                  </Link>
                </div>
              </div> /* UNLOCKED STATE */ :

            <div className="flex flex-col h-full">
                {/* Tabs */}
                <div className="flex p-2 gap-1 bg-slate-50 border-b border-slate-100 overflow-x-auto hide-scrollbar">
                  {[
                {
                  id: 'forecast',
                  label: 'Forecast',
                  icon: <TrendingUpIcon className="w-4 h-4" />
                },
                {
                  id: 'chat',
                  label: 'AI Chat',
                  icon: <MessageSquareIcon className="w-4 h-4" />
                },
                {
                  id: 'wallet',
                  label: 'Wallets',
                  icon: <WalletIcon className="w-4 h-4" />
                },
                {
                  id: 'export',
                  label: 'Export',
                  icon: <DownloadIcon className="w-4 h-4" />
                }].
                map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActivePremiumTab(tab.id as any)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activePremiumTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                  
                      {activePremiumTab === tab.id &&
                  <motion.div
                    layoutId="premium-tab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200" />

                  }
                      <span className="relative z-10 flex items-center gap-1.5">
                        {tab.icon} {tab.label}
                      </span>
                    </button>
                )}
                </div>

                {/* Tab Content */}
                <div className="p-6 flex-1 bg-white">
                  <AnimatePresence mode="wait">
                    {activePremiumTab === 'forecast' &&
                  <motion.div
                    key="forecast"
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    className="space-y-6">
                    
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="text-sm text-slate-500">
                                Prediksi Pengeluaran Akhir Bulan
                              </p>
                              <h4 className="text-2xl font-bold text-slate-900">
                                {formatRp(predictedEndOfMonth)}
                              </h4>
                            </div>
                            <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${overBudget > 0 ? 'bg-red-100 text-red-700' : 'bg-lime-100 text-lime-700'}`}>
                          
                              {overBudget > 0 ? 'Lewat Budget' : 'Aman'}
                            </span>
                          </div>

                          {/* Forecast line + area chart (recharts) */}
                          <div className="mt-3 -ml-2">
                            {actualCumulative.length >= 1 ?
                        <ForecastChart
                          data={forecastData}
                          budgetLimit={budgetLimit} /> :


                        <p className="h-40 flex items-center justify-center text-sm text-slate-400">
                                Catat pengeluaran untuk melihat prediksi.
                              </p>
                        }
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <span className="w-3 h-0.5 bg-indigo-600 rounded" />
                              Aktual
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-3 h-0.5 bg-slate-400 rounded" />
                              Prediksi
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-3 h-0.5 bg-red-500 rounded" />
                              Batas Budget ({formatRp(budgetLimit)})
                            </span>
                          </div>
                        </div>

                        {/* AI INSIGHT */}
                        <div
                      className={`rounded-xl p-4 border flex items-start gap-3 ${overBudget > 0 ? 'bg-red-50 border-red-100' : 'bg-lime-50 border-lime-100'}`}>
                      
                          <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${overBudget > 0 ? 'bg-red-100 text-red-600' : 'bg-lime-100 text-lime-700'}`}>
                        
                            <SparklesIcon className="w-4 h-4" />
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="text-slate-700">
                              Dengan pola pengeluaran saat ini, total
                              pengeluaran bulan ini diperkirakan mencapai{' '}
                              <span className="font-bold text-slate-900">
                                {formatRp(predictedEndOfMonth)}
                              </span>
                              .
                            </p>
                            {overBudget > 0 ?
                        <p className="font-semibold text-red-700">
                                Prediksi melebihi budget sebesar{' '}
                                {formatRp(overBudget)}. Yuk rem pengeluaran!
                              </p> :

                        <p className="font-semibold text-lime-700">
                                Kamu masih berpotensi menghemat{' '}
                                {formatRp(Math.abs(overBudget))} hingga akhir
                                bulan. Pertahankan!
                              </p>
                        }
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold text-sm text-slate-800 mb-3">
                            Simulasi Skenario Hemat
                          </h5>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">
                                  Kurangi jajan kopi
                                </span>
                                <span className="font-semibold text-indigo-600">
                                  {coffeeReduction}x / minggu
                                </span>
                              </div>
                              <input
                            type="range"
                            min="0"
                            max="5"
                            step="1"
                            value={coffeeReduction}
                            onChange={(e) =>
                            setCoffeeReduction(parseInt(e.target.value))
                            }
                            className="w-full accent-indigo-600" />
                          
                            </div>
                            {coffeeReduction > 0 &&
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.9
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1
                          }}
                          className="bg-lime-50 text-lime-800 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                          
                                <ZapIcon className="w-4 h-4 fill-lime-500" />
                                Kamu bisa nabung ekstra{' '}
                                {formatRp(coffeeReduction * 25000 * 4)} bulan
                                ini!
                              </motion.div>
                        }
                          </div>
                        </div>
                      </motion.div>
                  }

                    {activePremiumTab === 'chat' &&
                  <motion.div
                    key="chat"
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    className="flex flex-col h-[300px]">
                    
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 hide-scrollbar">
                          {chatMessages.map((msg, i) =>
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        
                              <div
                          className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                          
                                {msg.text}
                              </div>
                            </div>
                      )}
                          {isTyping &&
                      <div className="flex justify-start">
                              <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                                <motion.div
                            animate={{
                              y: [0, -5, 0]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0
                            }}
                            className="w-2 h-2 bg-slate-400 rounded-full" />
                          
                                <motion.div
                            animate={{
                              y: [0, -5, 0]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.2
                            }}
                            className="w-2 h-2 bg-slate-400 rounded-full" />
                          
                                <motion.div
                            animate={{
                              y: [0, -5, 0]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.4
                            }}
                            className="w-2 h-2 bg-slate-400 rounded-full" />
                          
                              </div>
                            </div>
                      }
                        </div>
                        <form
                      onSubmit={handleChatSubmit}
                      className="relative mt-auto">
                      
                          <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Tanya soal budgetmu..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                      
                          <button
                        type="submit"
                        disabled={!chatInput.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                        
                            <SendIcon className="w-4 h-4" />
                          </button>
                        </form>
                      </motion.div>
                  }

                    {activePremiumTab === 'wallet' &&
                  <motion.div
                    key="wallet"
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    className="space-y-4">
                    
                        {/* Wallet list with masked account & phone */}
                        <div className="space-y-3">
                          {wallets.map((w) => {
                        const tone: Record<
                          string,
                          {
                            box: string;
                            icon: string;
                            border: string;
                          }> =
                        {
                          indigo: {
                            box: 'bg-indigo-600 text-white',
                            icon: 'text-white',
                            border: 'border-indigo-200 bg-indigo-50'
                          },
                          emerald: {
                            box: 'bg-emerald-100 text-emerald-600',
                            icon: 'text-emerald-600',
                            border: 'border-slate-200 bg-white'
                          },
                          orange: {
                            box: 'bg-orange-100 text-orange-600',
                            icon: 'text-orange-600',
                            border: 'border-slate-200 bg-white'
                          }
                        };
                        const t = tone[w.color] || tone.emerald;
                        return (
                          <div
                            key={w.id}
                            className={`p-4 rounded-xl border ${t.border}`}>
                            
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.box}`}>
                                  
                                      <WalletIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium text-slate-500">
                                        {w.name}
                                      </p>
                                      <p className="font-bold text-slate-800">
                                        {formatRp(w.balance)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                                  <span>
                                    No. Rek:{' '}
                                    <span className="font-mono text-slate-700">
                                      {maskAccount(w.account)}
                                    </span>
                                  </span>
                                  <span>
                                    Telp:{' '}
                                    <span className="font-mono text-slate-700">
                                      {maskPhone(w.phone)}
                                    </span>
                                  </span>
                                </div>
                              </div>);

                      })}
                        </div>

                        {/* Transfer between wallets (simulated) */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h5 className="font-semibold text-sm text-slate-800 mb-3">
                            Transfer Antar Dompet
                          </h5>
                          <form onSubmit={handleTransfer} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                  Dari
                                </label>
                                <select
                              value={transferFrom}
                              onChange={(e) =>
                              setTransferFrom(e.target.value)
                              }
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                              
                                  {wallets.map((w) =>
                              <option key={w.id} value={w.id}>
                                      {w.name}
                                    </option>
                              )}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                  Ke
                                </label>
                                <select
                              value={transferTo}
                              onChange={(e) =>
                              setTransferTo(e.target.value)
                              }
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                              
                                  {wallets.map((w) =>
                              <option key={w.id} value={w.id}>
                                      {w.name}
                                    </option>
                              )}
                                </select>
                              </div>
                            </div>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                                Rp
                              </span>
                              <input
                            type="text"
                            value={transferAmount}
                            onChange={(e) =>
                            setTransferAmount(e.target.value)
                            }
                            placeholder="Nominal transfer"
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                          
                            </div>
                            <button
                          type="submit"
                          disabled={
                          !transferAmount || transferFrom === transferTo
                          }
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          
                              Transfer Sekarang
                            </button>
                            {transferFlash &&
                        <motion.p
                          initial={{
                            opacity: 0
                          }}
                          animate={{
                            opacity: 1
                          }}
                          className={`text-xs font-medium text-center ${transferFlash.includes('berhasil') ? 'text-lime-600' : 'text-red-500'}`}>
                          
                                {transferFlash}
                              </motion.p>
                        }
                          </form>
                        </div>

                        <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                          <PlusIcon className="w-4 h-4" /> Tambah Dompet
                        </button>
                      </motion.div>
                  }

                    {activePremiumTab === 'export' &&
                  <motion.div
                    key="export"
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
                    
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                          <DownloadIcon className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            Export Laporan Keuangan
                          </h4>
                          <p className="text-sm text-slate-500 max-w-[250px] mt-1">
                            Download laporan detail pengeluaran bulan ini untuk
                            evaluasi.
                          </p>
                        </div>
                        <div className="flex gap-3 w-full pt-4">
                          <button
                        onClick={() => handleExport('pdf')}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                        
                            <DownloadIcon className="w-4 h-4" /> Export PDF
                          </button>
                          <button
                        onClick={() => handleExport('excel')}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                        
                            <DownloadIcon className="w-4 h-4" /> Export Excel
                          </button>
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};
// Helper icon for Beranda/Dashboard
const SparklesIcon = (props: any) =>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}>
  
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>;