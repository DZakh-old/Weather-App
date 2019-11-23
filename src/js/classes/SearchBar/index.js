import elements from '../../app-elements';

const { searchBar } = elements;

export default class SearchBar {
  static setValue(value) {
    searchBar.value = value;
  }

  static getValue() {
    return searchBar.value;
  }

  static clear() {
    this.setValue('');
  }

  static blur() {
    searchBar.blur();
  }

  static isValue(value) {
    return searchBar.value === value;
  }

  static isIntermediateValue(intermediateValue = '...') {
    return this.isValue(intermediateValue);
  }

  static isFailedValue() {
    return this.isValue('Not Found!') || this.isValue('Error!') || this.isValue('Try later!');
  }

  static addEventListener(event, callback) {
    searchBar.addEventListener(event, callback);
  }
}
