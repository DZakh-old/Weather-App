export const getArrSum = arr => arr.reduce((acc, cur) => acc + cur, 0);

export const getArrAverage = arr => getArrSum(arr) / arr.length;
