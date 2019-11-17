import { WeatherService } from '..';
// import WeatherService from '../WeatherService';
import elements from '../../app-elements';

// TODO: Make class for API requests

const { searchBar } = elements;

export default class SearchProcessing {
  static async submit(prediction, inputData = '') {
    const buildApiRequestUrl = (/* prediction, inputData */) => {
      let apiType = 'findplacefromtext';
      let apiRequestData = inputData;
      if (prediction) {
        apiType = 'detailsbyplaceid';
        apiRequestData = prediction.placeId;
      }
      const encodedApiRequestData = encodeURIComponent(apiRequestData);
      return `/api/${apiType}/${encodedApiRequestData}`;
    };

    const getWeatherData = async (/* prediction, inputData */) => {
      const apiUrl = buildApiRequestUrl();
      const apiRes = await fetch(apiUrl);

      if (apiRes.status === 204) {
        WeatherService.disable();
        return { weatherData: undefined, placeName: 'Not Found!' };
      }
      if (apiRes.status >= 400) {
        WeatherService.disable();
        return { weatherData: undefined, placeName: 'Error!' };
      }

      return apiRes.json();
    };

    /* ___ Main script ___ */
    searchBar.blur();
    searchBar.value = prediction ? prediction.description : '...';
    WeatherService.toggleAppState();
    WeatherService.renderLoader();

    const { weatherData, placeName } = await getWeatherData();

    if (searchBar.value === '...') {
      searchBar.value = placeName;
    }

    if (weatherData) {
      WeatherService.renderWeather(weatherData);
    }
  }
}
