import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import { useTransactions } from './hooks/useTransactions';
import { useCategories } from './hooks/useCategories';

function App() {
  useTranslation();
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const {
    allCategories,
    addCategory,
    deleteCategory,
  } = useCategories();

  const handleClearData = () => {
    localStorage.removeItem('piggy-transactions');
    localStorage.removeItem('piggy-categories');
    window.location.reload();
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  allCategories={allCategories}
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}
                  allCategories={allCategories}
                  addTransaction={addTransaction}
                  updateTransaction={updateTransaction}
                  deleteTransaction={deleteTransaction}
                />
              }
            />
            <Route
              path="/categories"
              element={
                <Categories
                  allCategories={allCategories}
                  addCategory={addCategory}
                  deleteCategory={deleteCategory}
                />
              }
            />
            <Route
              path="/settings"
              element={<Settings onClearData={handleClearData} />}
            />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
