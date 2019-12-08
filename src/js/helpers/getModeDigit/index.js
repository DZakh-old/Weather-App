import { getKeyWithMaxValue } from '../objectHelpers';

export const getModeDigit = digits => {
  const countDigits = digitsList => {
    return digitsList.reduce((acc, cur) => {
      acc[cur] = cur in acc ? acc[cur] + 1 : 1;
      return acc;
    }, {});
  };

  const countedDigits = countDigits(digits);
  const modeDigit = getKeyWithMaxValue(countedDigits);
  return modeDigit;
};
