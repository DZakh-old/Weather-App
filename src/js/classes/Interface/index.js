import SearchBar from '../SearchBar';
import WeatherService from '../WeatherService';
import SearchProcessing from '../SearchProcessing';
import Autocomplete from '../Autocomplete';
import DarkMode from '../DarkMode';

export default class Interface {
  static activate() {
    DarkMode.activate();

    let mainPrediction;
    let session = new Date().getTime();

    SearchBar.addEventListener('keyup', async e => {
      const inputData = SearchBar.getValue();
      if (e.key === 'Enter') {
        await SearchProcessing.submit(mainPrediction, inputData);
        Autocomplete.clear();
      } else if (inputData.length > 3) {
        if (e.key.match(/^[\d\w]$/i)) {
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
// TODO: Would be nice to refactor it, but like this it's also ok -_-
