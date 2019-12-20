import { getKeyWithMaxValue } from './objectHelpers';

const countDigits = digitsList => {
  return digitsList.reduce((acc, cur) => {
    acc[cur] = cur in acc ? acc[cur] + 1 : 1;
    return acc;
  }, {});
};

export const getModeDigit = digits => {
  const countedDigits = countDigits(digits);
  const modeDigit = getKeyWithMaxValue(countedDigits);
  return modeDigit;
};
