const elementsAndTheirIdsFromTemplate = {
  app: 'app',
  weather: 'weather',
  searchBar: 'search-bar',
  autocomplete: 'autocomplete'
};

export default Object.fromEntries(
  Object.entries(elementsAndTheirIdsFromTemplate).map(([name, id]) => [
    name,
    document.getElementById(id)
  ])
);
