import { useState, useEffect } from 'react';

const STORAGE_KEY = 'piggy-transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  };

  const updateTransaction = (id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const getTransactionsByMonth = (year, month) => {
    return transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByMonth,
  };
};
