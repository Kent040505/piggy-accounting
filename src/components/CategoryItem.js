import React from 'react';
import { useTranslation } from 'react-i18next';

// Category item component
const CategoryItem = ({ category, onDelete }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    if (category.isDefault) {
      alert(t('categories.cannotDeleteDefault'));
      return;
    }
    if (window.confirm(t('categories.confirmDelete'))) {
      onDelete(category.id);
    }
  };

  return (
    <div className="category-item">
      <span className="category-icon">{category.icon}</span>
      <span className="category-name">
        {category.isDefault ? t(category.nameKey) : category.name}
      </span>
      {!category.isDefault && (
        <button className="btn-icon btn-delete" onClick={handleDelete} title={t('categories.delete')}>
          🗑️
        </button>
      )}
    </div>
  );
};

export default CategoryItem;
