import { elements } from '../../appElements';

const { searchBarContainer } = elements;

export const setSearchBarValue = value => {
  searchBarContainer.value = value;
};

export const getSearchBarValue = () => {
  return searchBarContainer.value;
};

export const clearSearchBarValue = () => {
  setSearchBarValue('');
};

export const blurSearchBar = () => {
  searchBarContainer.blur();
};

export const isSearchBarValue = value => {
  return getSearchBarValue() === value;
};

// TODO: Maybe move it to interface
export const isIntermediateValueInSearchBar = (intermediateValue = '...') => {
  return isSearchBarValue(intermediateValue);
};

export const isFailedValueInSearchBar = () => {
  return (
    isSearchBarValue('Not Found!') || isSearchBarValue('Error!') || isSearchBarValue('Try later!')
  );
};

export const addSearchBarEventListener = (event, callback) => {
  searchBarContainer.addEventListener(event, callback);
};
