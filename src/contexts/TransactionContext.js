import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

const STORAGE_KEY = 'piggy-transactions';

export const TransactionProvider = ({ children }) => {
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
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, clearTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
