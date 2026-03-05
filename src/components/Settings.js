import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { TransactionContext } from '../contexts/TransactionContext';

const Settings = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { clearTransactions } = useContext(TransactionContext);

  const handleClearData = () => {
    if (window.confirm(t('settings.clearDataConfirm'))) {
      clearTransactions();
      alert(t('settings.cleared'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 pt-8 pb-6 rounded-b-3xl shadow-md">
        <h1 className="text-xl font-bold text-center">
          {t('settings.title')}
        </h1>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 space-y-4">
        {/* Language switcher */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {t('settings.language')}
          </h2>
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            <button
              onClick={() => changeLanguage('en')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t('settings.english')}
            </button>
            <button
              onClick={() => changeLanguage('zh')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                language === 'zh'
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t('settings.chinese')}
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {t('settings.about')}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{t('settings.appName')}</span>
            <span className="text-sm text-gray-400">
              {t('settings.version')} 1.0.0
            </span>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <button
            onClick={handleClearData}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-400 border border-red-200 hover:bg-red-50 transition-colors"
          >
            {t('settings.clearData')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
