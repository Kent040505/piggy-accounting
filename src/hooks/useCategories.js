import { useState, useEffect } from 'react';

const STORAGE_KEY = 'piggy-categories';

const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'food', icon: '🍔', nameKey: 'defaultCategories.expense.food', isDefault: true, type: 'expense' },
  { id: 'transport', icon: '🚌', nameKey: 'defaultCategories.expense.transport', isDefault: true, type: 'expense' },
  { id: 'housing', icon: '🏠', nameKey: 'defaultCategories.expense.housing', isDefault: true, type: 'expense' },
  { id: 'entertainment', icon: '🎮', nameKey: 'defaultCategories.expense.entertainment', isDefault: true, type: 'expense' },
  { id: 'health', icon: '🏥', nameKey: 'defaultCategories.expense.health', isDefault: true, type: 'expense' },
  { id: 'clothing', icon: '👕', nameKey: 'defaultCategories.expense.clothing', isDefault: true, type: 'expense' },
  { id: 'education', icon: '📚', nameKey: 'defaultCategories.expense.education', isDefault: true, type: 'expense' },
  { id: 'shopping', icon: '🛒', nameKey: 'defaultCategories.expense.shopping', isDefault: true, type: 'expense' },
  { id: 'utilities', icon: '💡', nameKey: 'defaultCategories.expense.utilities', isDefault: true, type: 'expense' },
  { id: 'other-expense', icon: '➕', nameKey: 'defaultCategories.expense.other', isDefault: true, type: 'expense' },
];

const DEFAULT_INCOME_CATEGORIES = [
  { id: 'salary', icon: '💼', nameKey: 'defaultCategories.income.salary', isDefault: true, type: 'income' },
  { id: 'bonus', icon: '💰', nameKey: 'defaultCategories.income.bonus', isDefault: true, type: 'income' },
  { id: 'investment', icon: '📈', nameKey: 'defaultCategories.income.investment', isDefault: true, type: 'income' },
  { id: 'gift', icon: '🎁', nameKey: 'defaultCategories.income.gift', isDefault: true, type: 'income' },
  { id: 'other-income', icon: '➕', nameKey: 'defaultCategories.income.other', isDefault: true, type: 'income' },
];

export const DEFAULT_CATEGORIES = [
  ...DEFAULT_EXPENSE_CATEGORIES,
  ...DEFAULT_INCOME_CATEGORIES,
];

export const useCategories = () => {
  const [customCategories, setCustomCategories] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customCategories));
  }, [customCategories]);

  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: `custom-${crypto.randomUUID()}`,
      isDefault: false,
    };
    setCustomCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id) => {
    const cat = DEFAULT_CATEGORIES.find((c) => c.id === id);
    if (cat) return false; // Cannot delete default
    setCustomCategories((prev) => prev.filter((c) => c.id !== id));
    return true;
  };

  const getCategoriesByType = (type) => {
    return allCategories.filter((c) => c.type === type);
  };

  return {
    allCategories,
    customCategories,
    addCategory,
    deleteCategory,
    getCategoriesByType,
  };
};
