const elementsAndTheirIdsFromTemplate = {
  app: 'app',
  weatherContainer: 'weather',
  searchBarContainer: 'search-bar',
  autocompleteContainer: 'autocomplete',
  darkModeIcon: 'dark-mode-icon',
  darkModeBtn: 'dark-mode-btn'
};

export const elements = Object.fromEntries(
  Object.entries(elementsAndTheirIdsFromTemplate).map(([name, id]) => [
    name,
    document.getElementById(id)
  ])
);
