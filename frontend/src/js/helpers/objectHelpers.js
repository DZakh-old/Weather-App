export const getKeyWithMaxValue = obj => {
  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
};
