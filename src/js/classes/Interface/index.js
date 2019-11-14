/* eslint-disable no-param-reassign */
import WeatherService from '../WeatherService';

// TODO: Make class for API requests

export default class Interface {
  static activate(searchBar) {
    const weather = new WeatherService();

    const getPredictions = async inputData => {
      const encodedInputData = encodeURIComponent(inputData);
      const apiRes = await fetch(`/api/autocomplete/${encodedInputData}`);
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

      return apiRes.json();
    };

    const processSubmit = async (inputData, mainPrediction) => {
      searchBar.blur();

      const { weatherData, placeName } = await getWeatherData(inputData, mainPrediction); // TODO: searchBar.value -> inputData

      searchBar.value = placeName;

      if (weatherData) {
        weather.renderWeather(weatherData);
      }
    };

    (() => {
      let mainPrediction;

      searchBar.addEventListener('keyup', async e => {
        const inputData = searchBar.value;
        if (e.key === 'Enter') {
          await processSubmit(inputData, mainPrediction);
        } else if (inputData.length > 3) {
          const predictions = await getPredictions(inputData);
          [mainPrediction] = predictions;
          // TODO: Show predictions
        } else {
          mainPrediction = undefined;
        }
      });
    })();

    searchBar.addEventListener('focus', () => {
      if (weather.state === 'active') {
        searchBar.value = '';
        weather.disable();
      }
    });
  }
}
