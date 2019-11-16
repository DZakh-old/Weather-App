/* eslint-disable no-param-reassign */

import WeatherService from '../WeatherService';
import Autocomplete from '../Autocomplete';

// TODO: Make class for API requests

export default class Interface {
  static activate(searchBar) {
    const autocomplete = new Autocomplete();
    const weather = new WeatherService();

    const getPredictions = async (inputData, session) => {
      const encodedInputData = encodeURIComponent(inputData);
      const apiRes = await fetch(`/api/autocomplete/${encodedInputData}&${session}`);
      return apiRes.json();
    };

    const buildApiRequestUrl = (inputData, predictedPlace) => {
      let apiType = 'findplacefromtext';
      let apiRequestData = inputData;
      if (predictedPlace) {
        apiType = 'detailsbyplaceid';
        // TODO: Send name from autocomplete
        apiRequestData = predictedPlace.place_id;
      }
      const encodedApiRequestData = encodeURIComponent(apiRequestData);
      return `/api/${apiType}/${encodedApiRequestData}`;
    };

    const getWeatherData = async (inputData, mainPrediction) => {
      const apiUrl = buildApiRequestUrl(inputData, mainPrediction);
      const apiRes = await fetch(apiUrl);

      if (apiRes.status === 404) {
        return { weatherData: undefined, placeName: 'Not Found!' };
      }
      // TODO: Handle other errors

      return apiRes.json();
    };

    const processSubmit = async (inputData, mainPrediction) => {
      searchBar.blur();

      const { weatherData, placeName } = await getWeatherData(inputData, mainPrediction);

      searchBar.value = placeName;

      if (weatherData) {
        weather.renderWeather(weatherData);
      }
    };

    /* ___ Main script ___ */
    (() => {
      let mainPrediction;
      let session = new Date().getTime();

      searchBar.addEventListener('keyup', async e => {
        const inputData = searchBar.value;
        if (e.key === 'Enter') {
          await processSubmit(inputData, mainPrediction);
          autocomplete.clear();
          session = new Date().getTime();
        } else if (inputData.length > 3) {
          const predictions = await getPredictions(inputData, session);
          [mainPrediction] = predictions;
          const predictionDescriptions = predictions.map(prediction => prediction.description);
          autocomplete.renderPredictions(predictionDescriptions);
        } else {
          mainPrediction = undefined;
          autocomplete.clear();
        }
      });
    })();

    // TODO: Show autocomplete when predictions are focused
    searchBar.addEventListener('blur', () => {
      autocomplete.hide();
    });

    searchBar.addEventListener('focus', () => {
      if (weather.state === 'active') {
        searchBar.value = '';
        weather.disable();
      }
      if (searchBar.value === 'Not Found!') {
        searchBar.value = '';
        autocomplete.clear();
      }
      if (autocomplete.hasPredictions()) {
        autocomplete.show();
      }
    });
  }
}
