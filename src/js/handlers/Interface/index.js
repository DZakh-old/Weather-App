import SearchBar from '../SearchBar';
import { switchOffWeather, isWeatherShown } from '../weatherHandler';
import SearchProcessing from '../SearchProcessing';
import Autocomplete from '../Autocomplete';
import DarkMode from '../DarkMode';

export default class Interface {
  static activate() {
    DarkMode.activate();

    // TODO: Would be nice to refactor it, but for now it's also ok -_-
    let session = new Date().getTime();
    let mainPrediction;

    SearchBar.addEventListener('keydown', async e => {
      if (e.keyCode === 13 && SearchBar.getValue().length > 0) {
        await SearchProcessing.submit(mainPrediction, SearchBar.getValue());
        Autocomplete.clear();
      }
    });

    SearchBar.addEventListener('input', async e => {
      const isCurInputEqualToPrev = event => {
        return event.target.value.slice(-2, -1) === event.data;
      };

      const inputData = SearchBar.getValue();

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

    SearchBar.addEventListener('blur', () => {
      Autocomplete.hide();
    });

    SearchBar.addEventListener('focus', () => {
      if (isWeatherShown()) {
        SearchBar.clear();
        switchOffWeather();
        session = new Date().getTime();
      }
      if (SearchBar.isFailedValue()) {
        SearchBar.clear();
        Autocomplete.clear();
      }
      if (Autocomplete.hasPredictions()) {
        Autocomplete.show();
      }
    });
  }
}
