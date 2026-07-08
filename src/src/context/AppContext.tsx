import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  memo } from
'react';
export type TransactionCategory =
'UKT' |
'Kos' |
'Jajan' |
'Organisasi' |
'Transport' |
'Laundry' |
'Fotokopi' |
'Lainnya';
export type IncomeCategory =
'Uang Saku' |
'Hasil Kerja Part-time' |
'Beasiswa' |
'Hasil Jualan/Freelance' |
'Transfer Tabungan' |
'Lainnya';
export const INCOME_CATEGORIES: IncomeCategory[] = [
'Uang Saku',
'Hasil Kerja Part-time',
'Beasiswa',
'Hasil Jualan/Freelance',
'Transfer Tabungan',
'Lainnya'];

export interface Transaction {
  id: string;
  category: string;
  merchant: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  targetId?: string;
}
export interface Budget {
  category: TransactionCategory;
  limit: number;
  spent: number;
}
export interface SavingsTarget {
  id: string;
  name: string;
  targetAmount: number;
  monthlyAmount: number;
  saved: number;
  createdAt: string;
}
export interface AppState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  isPremium: boolean;
  points: number;
  balance: number;
  budgets: Budget[];
  transactions: Transaction[];
  badges: string[];
}
interface AppContextType extends AppState {
  login: (email: string, name: string) => void;
  logout: () => void;
  upgradeToPremium: () => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  addPoints: (amount: number) => void;
  savingsTargets: SavingsTarget[];
  addSavingsTarget: (
  target: Omit<SavingsTarget, 'id' | 'saved' | 'createdAt'>)
  => void;
  removeSavingsTarget: (id: string) => void;
  addToSavingsTarget: (id: string, amount: number) => void;
}
const defaultState: AppState = {
  isAuthenticated: true,
  user: {
    name: 'Rangga',
    email: 'rangga@kampus.ac.id'
  },
  isPremium: false,
  points: 1250,
  balance: 1500000,
  budgets: [
  {
    category: 'Jajan',
    limit: 1000000,
    spent: 750000
  },
  {
    category: 'Kos',
    limit: 800000,
    spent: 800000
  },
  {
    category: 'Transport',
    limit: 300000,
    spent: 150000
  },
  {
    category: 'Laundry',
    limit: 100000,
    spent: 45000
  }],

  transactions: [
  {
    id: 'inc-1',
    category: 'Uang Saku',
    merchant: 'Kiriman Ortu',
    amount: 2000000,
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    type: 'income'
  },
  {
    id: 'inc-2',
    category: 'Hasil Kerja Part-time',
    merchant: 'Cafe Senja',
    amount: 600000,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    type: 'income'
  },
  {
    id: '1',
    category: 'Jajan',
    merchant: 'Kopi Kenangan',
    amount: 25000,
    date: new Date().toISOString(),
    type: 'expense'
  },
  {
    id: '2',
    category: 'Kos',
    merchant: 'Ibu Kos',
    amount: 800000,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    type: 'expense'
  },
  {
    id: '3',
    category: 'Transport',
    merchant: 'Gojek',
    amount: 15000,
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    type: 'expense'
  },
  {
    id: '4',
    category: 'Laundry',
    merchant: 'Clean&Go',
    amount: 45000,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    type: 'expense'
  },
  {
    id: '5',
    category: 'Jajan',
    merchant: 'Warteg Bahari',
    amount: 20000,
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    type: 'expense'
  }],

  badges: ['First Login', 'Saver Month', 'Kos Master']
};
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({ children }: {children: ReactNode;}) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('kantongKuliahState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });
  useEffect(() => {
    localStorage.setItem('kantongKuliahState', JSON.stringify(state));
  }, [state]);
  // In-memory only (not persisted), per prototype storage rules
  const [savingsTargets, setSavingsTargets] = useState<SavingsTarget[]>([
  {
    id: 'seed-1',
    name: 'Laptop Baru',
    targetAmount: 8000000,
    monthlyAmount: 500000,
    saved: 2500000,
    createdAt: new Date().toISOString()
  }]
  );
  const addSavingsTarget = (
  target: Omit<SavingsTarget, 'id' | 'saved' | 'createdAt'>) =>
  {
    setSavingsTargets((prev) => [
    {
      ...target,
      id: Math.random().toString(36).substr(2, 9),
      saved: 0,
      createdAt: new Date().toISOString()
    },
    ...prev]
    );
  };
  const removeSavingsTarget = (id: string) => {
    setSavingsTargets((prev) => prev.filter((t) => t.id !== id));
  };
  const addToSavingsTarget = (id: string, amount: number) => {
    setSavingsTargets((prev) =>
    prev.map((t) =>
    t.id === id ?
    {
      ...t,
      saved: Math.min(t.targetAmount, t.saved + amount)
    } :
    t
    )
    );
  };
  const login = (email: string, name: string) => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      user: {
        email,
        name
      }
    }));
  };
  const logout = () => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      user: null,
      isPremium: false
    }));
  };
  const upgradeToPremium = () => {
    setState((prev) => ({
      ...prev,
      isPremium: true
    }));
  };
  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9)
    };
    setState((prev) => {
      const newBalance =
      tx.type === 'expense' ?
      prev.balance - tx.amount :
      prev.balance + tx.amount;
      // Update budget if expense
      const newBudgets = [...prev.budgets];
      if (tx.type === 'expense') {
        const budgetIdx = newBudgets.findIndex(
          (b) => b.category === tx.category
        );
        if (budgetIdx >= 0) {
          newBudgets[budgetIdx] = {
            ...newBudgets[budgetIdx],
            spent: newBudgets[budgetIdx].spent + tx.amount
          };
        }
      }
      return {
        ...prev,
        balance: newBalance,
        transactions: [newTx, ...prev.transactions],
        budgets: newBudgets
      };
    });
  };
  const addPoints = (amount: number) => {
    setState((prev) => ({
      ...prev,
      points: prev.points + amount
    }));
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        upgradeToPremium,
        addTransaction,
        addPoints,
        savingsTargets,
        addSavingsTarget,
        removeSavingsTarget,
        addToSavingsTarget
      }}>
      
      {children}
    </AppContext.Provider>);

};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};