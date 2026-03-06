import React from 'react';

// A summary card for displaying financial metrics
const SummaryCard = ({ title, amount, icon, color, formatCurrency }) => {
  return (
    <div className={`summary-card ${color}`}>
      <div className="summary-card-icon">{icon}</div>
      <div className="summary-card-content">
        <div className="summary-card-title">{title}</div>
        <div className="summary-card-amount">{formatCurrency(amount)}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
