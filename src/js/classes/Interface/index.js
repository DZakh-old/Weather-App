import elements from '../../app-elements';
import WeatherService from '../WeatherService';
import SearchProcessing from '../SearchProcessing';
import Autocomplete from '../Autocomplete';
import Ajax from '../Ajax';

const { searchBar } = elements;

export default class Interface {
  static activate() {
    const getPredictions = async (inputData, session) => {
      try {
        const encodedInputData = encodeURIComponent(inputData);
        const apiUrl = `/api/autocomplete/${encodedInputData}&${session}`;
        const apiRes = await Ajax.get(apiUrl);
        const { status } = apiRes;
        console.log(apiRes);
        if (status !== 200) {
          return undefined;
        }
        return apiRes;
      } catch (err) {
        throw new Error(err);
      }
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
        // TODO: check if e.key is letter
        // TODO: change focus if e.keyes are arrows
        const predictions = await getPredictions(inputData, session);
        if (!WeatherService.weatherIsShown()) {
          [mainPrediction] = predictions;
          Autocomplete.renderPredictions(predictions);
        }
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
      if (searchBar.value === 'Not Found!' || searchBar.value === 'Error!') {
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
