import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';

// Bar chart showing income vs expense over last 6 months
const MonthlyBarChart = ({ data }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <span>🐷</span>
        <p>{t('dashboard.noData')}</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#FFE4E9" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `¥${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="income" name={t('transactions.income')} fill="#4CAF50" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name={t('transactions.expense')} fill="#FF8FAB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
