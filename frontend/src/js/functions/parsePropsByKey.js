export const parsePropsByKey = (parsingArrOfObjects, key) => {
  return parsingArrOfObjects.map(obj => obj[key]);
};
