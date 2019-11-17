const createError = require('http-errors');
const Ajax = require('../Ajax');
const WeatherApi = require('../WeatherApi');

const { googleApiKey } = require('../../config');

class GoogleApi {
  static get(url) {
    try {
      const apiUrlWithKey = `${url}&key=${googleApiKey}`;
      const res = Ajax.get(apiUrlWithKey);
      console.log(res);
      return res;
    } catch (err) {
      throw createError(err);
    }
  }

  static async processAutocomplete(url) {
    try {
      const autocompleteRes = await GoogleApi.get(url);
      const { status } = autocompleteRes;
      if (status && status !== 'OK' && status >= 400) {
        return autocompleteRes;
      }

      const predictionList = await autocompleteRes.predictions.map(
        ({ description, place_id: placeId }) => ({
          description,
          placeId
        })
      );

      return predictionList;
    } catch (err) {
      throw createError(err);
    }
  }

  static async getProcessedWeather(url) {
    try {
      const placeDataRes = await GoogleApi.get(url);
      console.log(placeDataRes);
      const { status } = placeDataRes;
      if (status && status !== 'OK' && status >= 400) {
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

      const weatherData = await WeatherApi.get(lat, lon);

      return { weatherData, placeName };
    } catch (err) {
      throw createError(err);
    }
  }
}

module.exports = GoogleApi;
