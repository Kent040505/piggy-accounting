import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TransactionContext } from '../contexts/TransactionContext';

const INCOME_CATEGORIES = [
  'salary',
  'freelance',
  'investment',
  'gift',
  'other_income',
];

const EXPENSE_CATEGORIES = [
  'food',
  'transport',
  'shopping',
  'entertainment',
  'utilities',
  'rent',
  'health',
  'education',
  'other_expense',
];

const AddTransaction = () => {
  const { t } = useTranslation();
  const { addTransaction } = useContext(TransactionContext);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [success, setSuccess] = useState(false);

  const categories =
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    addTransaction({
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    setAmount('');
    setCategory('');
    setDescription('');
    setDate(today);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 pt-8 pb-6 rounded-b-3xl shadow-md">
        <h1 className="text-xl font-bold text-center">
          {t('addTransaction.title')}
        </h1>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6">
        {success && (
          <div className="bg-green-100 text-green-700 text-sm rounded-xl px-4 py-3 mb-4 text-center">
            {t('addTransaction.success')}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 space-y-5"
        >
          {/* Type toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                type === 'expense'
                  ? 'bg-red-400 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t('addTransaction.expense')}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                type === 'income'
                  ? 'bg-green-400 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t('addTransaction.income')}
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t('addTransaction.amount')}
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('addTransaction.amountPlaceholder')}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t('addTransaction.category')}
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">{t('addTransaction.selectCategory')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`addTransaction.categories.${cat}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t('addTransaction.description')}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('addTransaction.descriptionPlaceholder')}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t('addTransaction.date')}
            </label>
            <input
              type="date"
              required
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all shadow"
          >
            {t('addTransaction.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
