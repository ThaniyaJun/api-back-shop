export const reviewRating = (sum, count, precision = 2) => {
  const ratio = 5;
  const sumRate = ratio * count;
  return ((sum * ratio) / sumRate).toFixed(precision);
};

export const getMaxId = (id, value, prefix): string => {
  return '0';
};
