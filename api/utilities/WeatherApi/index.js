const { weatherApiKey } = require('../../config');
const Ajax = require('../Ajax');

class WeatherApi {
  static async get(lat, lon) {
    try {
      // TODO: Check error for limited quote
      const url = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lon}&units=metric`;
      const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': weatherApiKey
      };
      return Ajax.get(url, headers);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = WeatherApi;
