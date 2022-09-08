export const padLeft = (value, length, prefix = '0') => {
  return (value || '').toString().padStart(length, prefix);
};
