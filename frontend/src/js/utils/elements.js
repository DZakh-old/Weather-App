const elementsAndTheirIdsFromTemplate = {
  app: 'app',
  weatherContainer: 'weather',
  searchBarContainer: 'search-bar',
  autocompleteContainer: 'autocomplete',
  darkModeIcon: 'dark-mode-icon',
  darkModeBtn: 'dark-mode-btn'
};

export const elements = Object.entries(elementsAndTheirIdsFromTemplate).reduce(
  (acc, [name, id]) => ({
    ...acc,
    [name]: document.getElementById(id)
  }),
  {}
);
