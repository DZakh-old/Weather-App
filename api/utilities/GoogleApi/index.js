const createError = require('http-errors');
const Ajax = require('../Ajax');
const WeatherApi = require('../WeatherApi');

const { googleApiKey } = require('../../config');

const getGoogleUrlWithKey = url => {
  return `${url}&key=${googleApiKey}`;
};
const getGoogleStatusCode = ({ status }) => {
  switch (status) {
    case 'OK':
      return 200;
    case 'ZERO_RESULTS':
      return 204;
    case 'OVER_QUERY_LIMIT':
      return 429;
    default:
      return 500;
  }
};

class GoogleApi {
  static async get(url, timesRepeated = 0, delay = 125) {
    try {
      const urlWithKey = getGoogleUrlWithKey(url);
      const data = await Ajax.get(urlWithKey);
      data.statusCode = getGoogleStatusCode(data);
      if (data.statusCode === 429) {
        // TODO: Try again;
      }
      return data;
    } catch (err) {
      throw createError(err);
    }
  }

  static async processAutocomplete(url) {
    try {
      const autocompleteRes = await GoogleApi.get(url);
      const { statusCode } = autocompleteRes;
      if (statusCode >= 400) {
        return autocompleteRes;
      }

      const predictionList = await autocompleteRes.predictions.map(
        ({ description, place_id: placeId }) => ({
          description,
          placeId
        })
      );

      return { statusCode, predictionList };
    } catch (err) {
      throw createError(err);
    }
  }

  static async getProcessedWeather(url) {
    try {
      const placeDataRes = await GoogleApi.get(url);
      const { status } = placeDataRes;

      if (status && status !== 'OK' && (!+status || status >= 400)) {
        return placeDataRes;
      }

      const placeFromText = placeDataRes.candidates;
      if (placeFromText) {
        [placeDataRes.result] = placeFromText;
      } else if (placeFromText !== undefined) {
        placeDataRes.status = 204;
        return placeDataRes;
      }

      const { geometry, name: placeName } = placeDataRes.result;
      const { lat, lng: lon } = geometry.location;

      const { cod, list } = await WeatherApi.get(lat, lon);
      // TODO: Error 406 - Weather api limit
      return { status: +cod || cod || 406, weatherData: list, placeName };
    } catch (err) {
      throw createError(err);
    }
  }
}

module.exports = GoogleApi;
