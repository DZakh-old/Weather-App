const elementsAndTheirIdsFromTemplate = {
  app: 'app',
  weatherContainer: 'weather',
  searchBarContainer: 'search-bar',
  autocompleteContainer: 'autocomplete'
};

export const elements = Object.fromEntries(
  Object.entries(elementsAndTheirIdsFromTemplate).map(([name, id]) => [
    name,
    document.getElementById(id)
  ])
);
