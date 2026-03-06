import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Form for adding or editing a transaction
const TransactionForm = ({ onSubmit, onCancel, initialData, categories }) => {
  const { t } = useTranslation();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: today,
    note: '',
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setForm({ ...initialData });
  }, [initialData]);

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const validate = () => {
    const errs = {};
    if (!form.amount) errs.amount = t('transactions.amountRequired');
    else if (Number(form.amount) <= 0) errs.amount = t('transactions.amountPositive');
    if (!form.category) errs.category = t('transactions.categoryRequired');
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  const handleTypeChange = (type) => {
    setForm((f) => ({ ...f, type, category: '' }));
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {/* Type toggle */}
      <div className="form-group">
        <label className="form-label">{t('transactions.type')}</label>
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn ${form.type === 'expense' ? 'active expense' : ''}`}
            onClick={() => handleTypeChange('expense')}
          >
            {t('transactions.expense')}
          </button>
          <button
            type="button"
            className={`type-btn ${form.type === 'income' ? 'active income' : ''}`}
            onClick={() => handleTypeChange('income')}
          >
            {t('transactions.income')}
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="form-group">
        <label className="form-label">{t('transactions.amount')}</label>
        <input
          type="number"
          className={`form-input ${errors.amount ? 'error' : ''}`}
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errors.amount && <div className="form-error">{errors.amount}</div>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label">{t('transactions.category')}</label>
        <select
          className={`form-input ${errors.category ? 'error' : ''}`}
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">-- {t('transactions.category')} --</option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.isDefault ? t(cat.nameKey) : cat.name}
            </option>
          ))}
        </select>
        {errors.category && <div className="form-error">{errors.category}</div>}
      </div>

      {/* Date */}
      <div className="form-group">
        <label className="form-label">{t('transactions.date')}</label>
        <input
          type="date"
          className="form-input"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        />
      </div>

      {/* Note */}
      <div className="form-group">
        <label className="form-label">{t('transactions.note')}</label>
        <input
          type="text"
          className="form-input"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          placeholder={t('transactions.notePlaceholder')}
        />
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          {t('transactions.cancel')}
        </button>
        <button type="submit" className="btn btn-primary">
          {t('transactions.save')}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
