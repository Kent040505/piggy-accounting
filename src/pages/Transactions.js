import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionItem from '../components/TransactionItem';
import TransactionForm from '../components/TransactionForm';

// Transactions page
const Transactions = ({ transactions, allCategories, addTransaction, updateTransaction, deleteTransaction }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  const handleSubmit = (data) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{t('transactions.title')}</h1>
        <button
          className="btn btn-primary"
          onClick={() => { setShowForm(true); setEditingTransaction(null); }}
        >
          + {t('transactions.add')}
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingTransaction ? t('transactions.edit') : t('transactions.add')}
            </h2>
            <TransactionForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingTransaction}
              categories={allCategories}
            />
          </div>
        </div>
      )}

      <div className="transaction-list">
        {sortedTransactions.length === 0 ? (
          <div className="empty-state">
            <span>🐷</span>
            <p>{t('transactions.noTransactions')}</p>
          </div>
        ) : (
          sortedTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              category={allCategories.find((c) => c.id === tx.category)}
              onDelete={deleteTransaction}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
