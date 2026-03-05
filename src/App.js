import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { TransactionProvider } from './contexts/TransactionContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Settings from './components/Settings';

const App = () => {
  return (
    <LanguageProvider>
      <TransactionProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </LanguageProvider>
  );
};

export default App;
