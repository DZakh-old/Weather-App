import WeatherService from '../weatherHandler';
import Ajax from '../Ajax';
import SearchBar from '../SearchBar';
import { toggleAppState } from '../appHandler';

const buildApiRequestUrl = (prediction, inputData) => {
  const apiType = prediction ? 'detailsbyplaceid' : 'findplacefromtext';
  const apiRequestData = prediction ? prediction.placeId : inputData;
  const encodedApiRequestData = encodeURIComponent(apiRequestData);
  return `/api/${apiType}/${encodedApiRequestData}`;
};

const getWeatherData = async (prediction, inputData) => {
  try {
    const apiUrl = buildApiRequestUrl(prediction, inputData);
    const apiRes = await Ajax.get(apiUrl);
    const { status } = apiRes;
    if (status !== 200) {
      WeatherService.disable();
      SearchBar.setValue('...');
      switch (status) {
        case 204:
          return { weatherData: undefined, placeName: 'Not Found!' };
        case 406:
        case 429:
          return { weatherData: undefined, placeName: 'Try later!' };
        default:
          return { weatherData: undefined, placeName: 'Error!' };
      }
    }
    return apiRes;
  } catch (err) {
    throw new Error(err);
  }
};

export default class SearchProcessing {
  static async submit(prediction, inputData = '') {
    SearchBar.blur();
    SearchBar.setValue(prediction ? prediction.description : '...');
    toggleAppState();
    WeatherService.renderLoader();

    const { weatherData, placeName } = await getWeatherData(prediction, inputData);

    if (SearchBar.isIntermediateValue()) {
      SearchBar.setValue(placeName);
    }

    if (weatherData) {
      WeatherService.renderWeather(weatherData);
    }
  }
}
