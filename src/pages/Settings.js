import React from 'react';
import { useTranslation } from 'react-i18next';

// Settings page
const Settings = ({ onClearData }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('piggy-language', lang);
  };

  const handleClearData = () => {
    if (window.confirm(t('settings.clearDataConfirm'))) {
      onClearData();
      alert(t('settings.clearDataSuccess'));
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{t('settings.title')}</h1>

      <div className="card">
        <h2 className="card-title">{t('settings.language')}</h2>
        <div className="language-options">
          <button
            className={`lang-option-btn ${i18n.language === 'zh' ? 'active' : ''}`}
            onClick={() => toggleLanguage('zh')}
          >
            🇨🇳 {t('settings.chinese')}
          </button>
          <button
            className={`lang-option-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => toggleLanguage('en')}
          >
            🇬🇧 {t('settings.english')}
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⚠️ {t('settings.clearData')}</h2>
        <button className="btn btn-danger" onClick={handleClearData}>
          🗑️ {t('settings.clearData')}
        </button>
      </div>

      <div className="card">
        <h2 className="card-title">{t('settings.about')}</h2>
        <p className="about-text">{t('settings.aboutText')}</p>
        <p className="about-version">v1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;
