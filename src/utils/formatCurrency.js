// Format a number as currency with ¥ symbol
export const formatCurrency = (amount) => {
  return `¥${Number(amount).toFixed(2)}`;
};

export default formatCurrency;
