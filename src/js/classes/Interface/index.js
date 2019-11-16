import elements from '../../app-elements';
import { WeatherService, SearchProcessing, Autocomplete } from '..';

const { searchBar } = elements;

export default class Interface {
  static activate() {
    const getPredictions = async (inputData, session) => {
      const encodedInputData = encodeURIComponent(inputData);
      const apiRes = await fetch(`/api/autocomplete/${encodedInputData}&${session}`);
      return apiRes.json();
    };

    /* ___ Main script ___ */
    let mainPrediction;
    let session = new Date().getTime();

    searchBar.addEventListener('keyup', async e => {
      const inputData = searchBar.value;
      if (e.key === 'Enter') {
        await SearchProcessing.submit(mainPrediction, inputData);
        Autocomplete.clear();
      } else if (inputData.length > 3) {
        const predictions = await getPredictions(inputData, session);
        [mainPrediction] = predictions;
        Autocomplete.renderPredictions(predictions);
      } else {
        mainPrediction = undefined;
        Autocomplete.clear();
      }
    });

    searchBar.addEventListener('blur', () => {
      Autocomplete.hide();
    });

    searchBar.addEventListener('focus', () => {
      if (WeatherService.weatherIsShown()) {
        searchBar.value = '';
        WeatherService.disable();
        session = new Date().getTime();
      }
      if (searchBar.value === 'Not Found!') {
        searchBar.value = '';
        Autocomplete.clear();
      }
      if (Autocomplete.hasPredictions()) {
        Autocomplete.show();
      }
    });
  }
}
// TODO: Would be nice to refactor it, but like this it's also ok -_-
