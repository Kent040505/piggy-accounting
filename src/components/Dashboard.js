import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionContext } from '../contexts/TransactionContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { transactions } = useContext(TransactionContext);

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;
  const currency = t('common.currency');

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatAmount = (amount) =>
    `${currency}${amount.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 pt-8 pb-16 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          🐷 {t('dashboard.title')}
        </h1>
        <div className="text-center">
          <p className="text-pink-100 text-sm mb-1">{t('dashboard.totalBalance')}</p>
          <p className="text-4xl font-bold tracking-tight">
            {formatAmount(balance)}
          </p>
        </div>
      </div>

      {/* Income / Expense summary */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-md p-4 flex justify-around">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">{t('dashboard.totalIncome')}</p>
            <p className="text-lg font-semibold text-green-500">
              +{formatAmount(totalIncome)}
            </p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">{t('dashboard.totalExpense')}</p>
            <p className="text-lg font-semibold text-red-400">
              -{formatAmount(totalExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
          {t('dashboard.recentTransactions')}
        </h2>
        {recent.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400">
            <p className="text-4xl mb-3">🐷</p>
            <p>{t('dashboard.noTransactions')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((tx) => (
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
                      {tx.description || tx.date}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    tx.type === 'income' ? 'text-green-500' : 'text-red-400'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatAmount(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
