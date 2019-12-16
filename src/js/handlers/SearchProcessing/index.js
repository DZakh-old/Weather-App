import { switchOffWeather, renderLoaderInWeatherContainer, renderWeather } from '../weatherHandler';
import { setSearchBarValue, blurSearchBar, isInterimValueInSearchBar } from '../searchBarHandler';
import { toggleAppState } from '../appHandler';
import { messages } from '../../utils/messages';

import Ajax from '../../helpers/Ajax';

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
      switchOffWeather();
      setSearchBarValue(messages.interim);

      switch (status) {
        case 204:
          return { weatherData: undefined, placeName: messages.error204 };
        case 406:
        case 429:
          return { weatherData: undefined, placeName: messages.error406 };
        default:
          return { weatherData: undefined, placeName: messages.error429 };
      }
    }
    return apiRes;
  } catch (err) {
    throw new Error(err);
  }
};

export const submitCitySearch = async (prediction, inputData = '') => {
  blurSearchBar();
  setSearchBarValue(prediction ? prediction.description : messages.interim);
  toggleAppState();
  renderLoaderInWeatherContainer();

  const { weatherData, placeName } = await getWeatherData(prediction, inputData);

  if (isInterimValueInSearchBar()) {
    setSearchBarValue(placeName);
  }

  if (weatherData) {
    renderWeather(weatherData);
  }
};
