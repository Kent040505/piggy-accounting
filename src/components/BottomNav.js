import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Bottom navigation bar for mobile
const BottomNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">📊</span>
        <span className="bottom-nav-label">{t('nav.dashboard')}</span>
      </NavLink>
      <NavLink to="/transactions" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">💸</span>
        <span className="bottom-nav-label">{t('nav.transactions')}</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">🗂️</span>
        <span className="bottom-nav-label">{t('nav.categories')}</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">⚙️</span>
        <span className="bottom-nav-label">{t('nav.settings')}</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
