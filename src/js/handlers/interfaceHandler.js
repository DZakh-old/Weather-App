import {
  getSearchBarValue,
  clearSearchBarValue,
  isFailedValueInSearchBar,
  addSearchBarEventListener
} from './searchBarHandler';
import {
  clearAutocomplete,
  getAutocompletePredictions,
  renderAutocompletePredictions,
  showAutocompletePredictions,
  hideAutocompletePredictions,
  hasAutocompletePredictions
} from './autocompleteHandler';
import { switchOffWeather, isWeatherShown } from './weatherHandler';
import { submitCitySearch } from './searchProcessing';
import { activateDarkMode } from './darkModeHandler';

export const activateInterface = () => {
  activateDarkMode();
  let session = new Date().getTime();
  let mainPrediction;

  addSearchBarEventListener('keydown', async e => {
    if (e.keyCode === 13 && getSearchBarValue().length > 0) {
      await submitCitySearch(mainPrediction, getSearchBarValue());
      clearAutocomplete();
    }
  });

  addSearchBarEventListener('input', async e => {
    const isCurInputEqualToPrev = event => {
      return event.target.value.slice(-2, -1) === event.data;
    };

    const inputData = getSearchBarValue();

    if (inputData.length > 2) {
      if (e.data && e.data.match(/^[ёа-я\d\w]$/i) && !isCurInputEqualToPrev(e)) {
        const predictions = await getAutocompletePredictions(inputData, session);
        if (predictions && !isWeatherShown()) {
          [mainPrediction] = predictions;
          renderAutocompletePredictions(predictions);
        }
      }
    } else {
      mainPrediction = null;
      clearAutocomplete();
    }
  });

  addSearchBarEventListener('blur', () => {
    hideAutocompletePredictions();
  });

  addSearchBarEventListener('focus', () => {
    if (isWeatherShown()) {
      clearSearchBarValue();
      switchOffWeather();
      session = new Date().getTime();
    }
    if (isFailedValueInSearchBar()) {
      clearSearchBarValue();
      clearAutocomplete();
    }
    if (hasAutocompletePredictions()) {
      showAutocompletePredictions();
    }
  });
};
