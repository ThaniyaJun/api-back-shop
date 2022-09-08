export const toNumber = (val: any): number => {
  try {
    if (Number.isNaN(val)) return 0;
    if (val === null || val === undefined) return 0;
    return +val;
  } catch (error) {
    return 0;
  }
};

export const toString = (val: any): string => {
  try {
    return (val || '').toString();
  } catch (error) {
    return '';
  }
};
