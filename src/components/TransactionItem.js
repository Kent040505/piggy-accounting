import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../utils/formatCurrency';

// Single transaction item row
const TransactionItem = ({ transaction, category, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const isIncome = transaction.type === 'income';

  return (
    <div className="transaction-item">
      <div className="transaction-icon">
        {category ? category.icon : '💸'}
      </div>
      <div className="transaction-details">
        <div className="transaction-category">
          {category ? (category.isDefault ? t(category.nameKey) : category.name) : transaction.category}
        </div>
        {transaction.note && (
          <div className="transaction-note">{transaction.note}</div>
        )}
        <div className="transaction-date">{transaction.date}</div>
      </div>
      <div className="transaction-right">
        <div className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div className="transaction-actions">
          {onEdit && (
            <button className="btn-icon" onClick={() => onEdit(transaction)} title="Edit">✏️</button>
          )}
          <button
            className="btn-icon btn-delete"
            onClick={() => {
              if (window.confirm(t('transactions.confirmDelete'))) {
                onDelete(transaction.id);
              }
            }}
            title={t('transactions.delete')}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
