import SearchBar from '../SearchBar';
import WeatherService from '../WeatherService';
import SearchProcessing from '../SearchProcessing';
import Autocomplete from '../Autocomplete';
import DarkMode from '../DarkMode';

const isCurDataEventAsPrevious = e => {
  return e.target.value.slice(-2, -1) === e.data;
};

export default class Interface {
  static activate() {
    DarkMode.activate();

    let session = new Date().getTime();

    SearchBar.addEventListener('input', async e => {
      const inputData = SearchBar.getValue();
      let mainPrediction;

      if (e.data === 'Enter') {
        await SearchProcessing.submit(mainPrediction, inputData);
        Autocomplete.clear();
      } else if (inputData.length > 3) {
        if (e.data.match(/^[\d\w]$/i) && !isCurDataEventAsPrevious(e)) {
          const predictions = await Autocomplete.getPredictions(inputData, session);
          if (predictions && !WeatherService.weatherIsShown()) {
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
      if (WeatherService.weatherIsShown()) {
        SearchBar.clear();
        WeatherService.disable();
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
// TODO: Would be nice to refactor it, but for now it's also ok -_-
