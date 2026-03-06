import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryItem from '../components/CategoryItem';

// Categories management page
const Categories = ({ allCategories, addCategory, deleteCategory }) => {
  const { t } = useTranslation();
  const [newCat, setNewCat] = useState({ name: '', icon: '', type: 'expense' });
  const [errors, setErrors] = useState({});

  const expenseCategories = allCategories.filter((c) => c.type === 'expense');
  const incomeCategories = allCategories.filter((c) => c.type === 'income');

  const validate = () => {
    const errs = {};
    if (!newCat.name.trim()) errs.name = t('categories.nameRequired');
    if (!newCat.icon.trim()) errs.icon = t('categories.iconRequired');
    return errs;
  };

  const handleAdd = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addCategory({ name: newCat.name.trim(), icon: newCat.icon.trim(), type: newCat.type });
    setNewCat({ name: '', icon: '', type: 'expense' });
    setErrors({});
  };

  return (
    <div className="page">
      <h1 className="page-title">{t('categories.title')}</h1>

      {/* Add custom category form */}
      <div className="card">
        <h2 className="card-title">{t('categories.addCustom')}</h2>
        <div className="category-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t('categories.categoryIcon')}</label>
              <input
                type="text"
                className={`form-input icon-input ${errors.icon ? 'error' : ''}`}
                value={newCat.icon}
                onChange={(e) => setNewCat((c) => ({ ...c, icon: e.target.value }))}
                placeholder={t('categories.categoryIconPlaceholder')}
                maxLength={2}
              />
              {errors.icon && <div className="form-error">{errors.icon}</div>}
            </div>
            <div className="form-group flex-grow">
              <label className="form-label">{t('categories.categoryName')}</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={newCat.name}
                onChange={(e) => setNewCat((c) => ({ ...c, name: e.target.value }))}
                placeholder={t('categories.categoryNamePlaceholder')}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t('transactions.type')}</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={`type-btn ${newCat.type === 'expense' ? 'active expense' : ''}`}
                  onClick={() => setNewCat((c) => ({ ...c, type: 'expense' }))}
                >
                  {t('transactions.expense')}
                </button>
                <button
                  type="button"
                  className={`type-btn ${newCat.type === 'income' ? 'active income' : ''}`}
                  onClick={() => setNewCat((c) => ({ ...c, type: 'income' }))}
                >
                  {t('transactions.income')}
                </button>
              </div>
            </div>
            <button className="btn btn-primary add-category-btn" onClick={handleAdd}>
              + {t('categories.add')}
            </button>
          </div>
        </div>
      </div>

      {/* Expense categories */}
      <div className="card">
        <h2 className="card-title">📉 {t('categories.expense')}</h2>
        <div className="category-grid">
          {expenseCategories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} onDelete={deleteCategory} />
          ))}
        </div>
      </div>

      {/* Income categories */}
      <div className="card">
        <h2 className="card-title">📈 {t('categories.income')}</h2>
        <div className="category-grid">
          {incomeCategories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} onDelete={deleteCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
