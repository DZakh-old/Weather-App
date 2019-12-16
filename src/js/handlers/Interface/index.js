import {
  getSearchBarValue,
  clearSearchBarValue,
  isFailedValueInSearchBar,
  addSearchBarEventListener
} from '../searchBarHandler';
import { switchOffWeather, isWeatherShown } from '../weatherHandler';
import { submitCitySearch } from '../searchProcessing';
import Autocomplete from '../Autocomplete';
import DarkMode from '../DarkMode';

export default class Interface {
  static activate() {
    DarkMode.activate();

    // TODO: Would be nice to refactor it, but for now it's also ok -_-
    let session = new Date().getTime();
    let mainPrediction;

    addSearchBarEventListener('keydown', async e => {
      if (e.keyCode === 13 && getSearchBarValue().length > 0) {
        await submitCitySearch(mainPrediction, getSearchBarValue());
        Autocomplete.clear();
      }
    });

    addSearchBarEventListener('input', async e => {
      const isCurInputEqualToPrev = event => {
        return event.target.value.slice(-2, -1) === event.data;
      };

      const inputData = getSearchBarValue();

      if (inputData.length > 3) {
        if (e.data && e.data.match(/^[ёа-я\d\w]$/i) && !isCurInputEqualToPrev(e)) {
          const predictions = await Autocomplete.getPredictions(inputData, session);
          if (predictions && !isWeatherShown()) {
            [mainPrediction] = predictions;
            Autocomplete.renderPredictions(predictions);
          }
        }
      } else {
        mainPrediction = undefined;
        Autocomplete.clear();
      }
    });

    addSearchBarEventListener('blur', () => {
      Autocomplete.hide();
    });

    addSearchBarEventListener('focus', () => {
      if (isWeatherShown()) {
        clearSearchBarValue();
        switchOffWeather();
        session = new Date().getTime();
      }
      if (isFailedValueInSearchBar()) {
        clearSearchBarValue();
        Autocomplete.clear();
      }
      if (Autocomplete.hasPredictions()) {
        Autocomplete.show();
      }
    });
  }
}
