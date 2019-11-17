import WeatherService from '../WeatherService';
import Ajax from '../Ajax';

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
      try {
        const apiUrl = buildApiRequestUrl();
        const apiRes = await Ajax.get(apiUrl);

        const { status } = apiRes;
        if (status > 200) {
          WeatherService.disable();
          searchBar.value = '...';
          return status < 400
            ? { weatherData: undefined, placeName: 'Not Found!' }
            : { weatherData: undefined, placeName: 'Error!' };
        }

        return apiRes;
      } catch (err) {
        throw new Error(err);
      }
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
    console.log(weatherData);
    if (weatherData) {
      WeatherService.renderWeather(weatherData);
    }
  }
}
