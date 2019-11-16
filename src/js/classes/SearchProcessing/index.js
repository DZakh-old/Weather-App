/* eslint-disable no-param-reassign */

import elements from '../../app-elements';
import WeatherService from '../WeatherService';

// TODO: Make class for API requests

const { searchBar } = elements;

export default class SearchProcessing {
  static async submit(mainPrediction, inputData = '') {
    const buildApiRequestUrl = prediction => {
      let apiType = 'findplacefromtext';
      let apiRequestData = inputData;
      if (prediction) {
        apiType = 'detailsbyplaceid';
        // TODO: Send name from autocomplete
        apiRequestData = prediction.placeId;
      }
      const encodedApiRequestData = encodeURIComponent(apiRequestData);
      return `/api/${apiType}/${encodedApiRequestData}`;
    };

    const getWeatherData = async prediction => {
      const apiUrl = buildApiRequestUrl(prediction);
      const apiRes = await fetch(apiUrl);

      if (apiRes.status === 404) {
        return { weatherData: undefined, placeName: 'Not Found!' };
      }
      // TODO: Handle other errors

      return apiRes.json();
    };

    /* ___ Main script ___ */
    console.log('hi');
    searchBar.blur();

    const { weatherData, placeName } = await getWeatherData(mainPrediction);

    searchBar.value = placeName;

    if (weatherData) {
      WeatherService.renderWeather(weatherData);
    }
  }
}
