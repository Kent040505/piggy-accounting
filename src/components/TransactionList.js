import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionContext } from '../contexts/TransactionContext';

const TransactionList = () => {
  const { t } = useTranslation();
  const { transactions, deleteTransaction } = useContext(TransactionContext);
  const [filter, setFilter] = useState('all');

  const currency = t('common.currency');

  const filtered = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleDelete = (id) => {
    if (window.confirm(t('transactionList.deleteConfirm'))) {
      deleteTransaction(id);
    }
  };

  const formatAmount = (amount) => `${currency}${amount.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 pt-8 pb-6 rounded-b-3xl shadow-md">
        <h1 className="text-xl font-bold text-center">
          {t('transactionList.title')}
        </h1>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6">
        {/* Filter tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white mb-4 shadow-sm">
          {['all', 'income', 'expense'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-pink-400 text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t(`transactionList.${f}`)}
            </button>
          ))}
        </div>

        {/* List */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400">
            <p className="text-4xl mb-3">🐷</p>
            <p>{t('transactionList.noTransactions')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {tx.type === 'income' ? '💰' : '💸'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {t(`addTransaction.categories.${tx.category}`, tx.category)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {tx.description ? `${tx.description} · ` : ''}
                      {tx.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p
                    className={`text-sm font-semibold ${
                      tx.type === 'income' ? 'text-green-500' : 'text-red-400'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatAmount(tx.amount)}
                  </p>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-gray-300 hover:text-red-400 text-lg leading-none transition-colors"
                    aria-label={t('common.delete')}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
