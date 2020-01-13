export const minusCompensator = str => {
  return str[0] === '-' ? `${str}&nbsp;` : str;
};
