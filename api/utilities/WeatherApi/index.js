const { weatherApiKey } = require('../../config');
const Ajax = require('../Ajax');

class WeatherApi {
  static async getWeatherDataByLocation(lat, lon) {
    try {
      const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lon}&units=metric`;
      const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': weatherApiKey
      };
      const weatherApiData = await Ajax.get(apiUrl, headers);
      return weatherApiData.list;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = WeatherApi;
