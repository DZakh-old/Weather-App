const elementsAndThereIdsFromTemplate = {
  app: 'app',
  weather: 'weather',
  searchBar: 'search-bar',
  autocomplete: 'autocomplete'
};

export default Object.fromEntries(
  Object.entries(elementsAndThereIdsFromTemplate).map(([name, id]) => [
    name,
    document.getElementById(id)
  ])
);
