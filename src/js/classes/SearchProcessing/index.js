import WeatherService from '../WeatherService';
import Ajax from '../Ajax';

import elements from '../../app-elements';

const { searchBar } = elements;

export default class SearchProcessing {
  static async submit(prediction, inputData = '') {
    const buildApiRequestUrl = (/* prediction, inputData */) => {
      const apiType = prediction ? 'detailsbyplaceid' : 'findplacefromtext';
      const apiRequestData = prediction ? inputData : prediction.placeId;
      const encodedApiRequestData = encodeURIComponent(apiRequestData);
      return `/api/${apiType}/${encodedApiRequestData}`;
    };

    const getWeatherData = async (/* prediction, inputData */) => {
      try {
        const apiUrl = buildApiRequestUrl();
        const apiRes = await Ajax.get(apiUrl);

        const { statusCode } = apiRes;
        if (statusCode > 200) {
          WeatherService.disable();
          searchBar.value = '...';
          switch (statusCode < 400) {
            case 204:
              return { weatherData: undefined, placeName: 'Not Found!' };
            case 429:
              return { weatherData: undefined, placeName: 'Try in a day!' };
            default:
              return { weatherData: undefined, placeName: 'Error!' };
          }
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

    if (weatherData) {
      WeatherService.renderWeather(weatherData);
    }
  }
}
