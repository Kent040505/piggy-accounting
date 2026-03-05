import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors ${
      isActive
        ? 'text-pink-600'
        : 'text-gray-500 hover:text-pink-500'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex">
        <NavLink to="/" end className={linkClass}>
          <span className="text-xl mb-0.5">🏠</span>
          <span>{t('nav.home')}</span>
        </NavLink>
        <NavLink to="/add" className={linkClass}>
          <span className="text-xl mb-0.5">➕</span>
          <span>{t('nav.add')}</span>
        </NavLink>
        <NavLink to="/transactions" className={linkClass}>
          <span className="text-xl mb-0.5">📋</span>
          <span>{t('transactionList.title')}</span>
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <span className="text-xl mb-0.5">⚙️</span>
          <span>{t('nav.settings')}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
