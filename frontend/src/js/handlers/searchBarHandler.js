import { elements } from '../utils/elements';
import { messages } from '../utils/messages';

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

export const isInterimValueInSearchBar = () => {
  return isSearchBarValue(messages.interim);
};

export const isFailedValueInSearchBar = () => {
  return (
    isSearchBarValue(messages.error204) ||
    isSearchBarValue(messages.error406) ||
    isSearchBarValue(messages.error429)
  );
};

export const addSearchBarEventListener = (event, callback) => {
  searchBarContainer.addEventListener(event, callback);
};
