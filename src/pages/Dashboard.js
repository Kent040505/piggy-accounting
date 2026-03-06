import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SummaryCard from '../components/SummaryCard';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import { formatCurrency } from '../utils/formatCurrency';

// Dashboard page with financial overview
const Dashboard = ({ transactions, allCategories }) => {
  const { t } = useTranslation();
  const now = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth() + 1);

  // Filter transactions for selected month
  const monthTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });
  }, [transactions, selectedYear, selectedMonth]);

  const monthIncome = useMemo(
    () => monthTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [monthTransactions]
  );
  const monthExpense = useMemo(
    () => monthTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [monthTransactions]
  );
  const totalBalance = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0) -
          transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  // Pie chart data: expense breakdown by category
  const pieData = useMemo(() => {
    const expenseMap = {};
    monthTransactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        const cat = allCategories.find((c) => c.id === tx.category);
        const label = cat ? (cat.isDefault ? t(cat.nameKey) : cat.name) : tx.category;
        expenseMap[label] = (expenseMap[label] || 0) + tx.amount;
      });
    return Object.entries(expenseMap).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));
  }, [monthTransactions, allCategories, t]);

  // Bar chart: last 6 months
  const barData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const monthTxs = transactions.filter((tx) => {
        const td = new Date(tx.date);
        return td.getFullYear() === y && td.getMonth() + 1 === m;
      });
      const income = monthTxs.filter((tx) => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
      const expense = monthTxs.filter((tx) => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
      months.push({
        month: `${y}/${String(m).padStart(2, '0')}`,
        income: parseFloat(income.toFixed(2)),
        expense: parseFloat(expense.toFixed(2)),
      });
    }
    return months;
  }, [transactions, now]);

  // Build year-month options
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = now.getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="page">
      <h1 className="page-title">{t('dashboard.title')}</h1>

      {/* Month filter */}
      <div className="month-filter">
        <label className="form-label">{t('dashboard.filterMonth')}: </label>
        <select
          className="form-input filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select
          className="form-input filter-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((m) => (
            <option key={m} value={m}>{t(`months.${m}`)}</option>
          ))}
        </select>
      </div>

      {/* Summary cards */}
      <div className="summary-cards">
        <SummaryCard
          title={t('dashboard.balance')}
          amount={totalBalance}
          icon="💰"
          color="balance"
          formatCurrency={formatCurrency}
        />
        <SummaryCard
          title={t('dashboard.income')}
          amount={monthIncome}
          icon="📈"
          color="income"
          formatCurrency={formatCurrency}
        />
        <SummaryCard
          title={t('dashboard.expense')}
          amount={monthExpense}
          icon="��"
          color="expense"
          formatCurrency={formatCurrency}
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card chart-card">
          <h2 className="card-title">{t('dashboard.expenseBreakdown')}</h2>
          <ExpensePieChart data={pieData} />
        </div>
        <div className="card chart-card">
          <h2 className="card-title">{t('dashboard.monthlyTrend')}</h2>
          <MonthlyBarChart data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
