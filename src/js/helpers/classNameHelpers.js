export const replaceElClassName = (element, regEx, replacement) => {
  // TODO: make varsion also of strings
  // eslint-disable-next-line no-param-reassign
  element.className = element.className.replace(regEx, replacement);
};
