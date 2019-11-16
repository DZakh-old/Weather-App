const fetch = require('node-fetch');
const { weatherApiKey } = require('../config');

module.exports = class WeatherApi {
  static async get(lat, lon) {
    try {
      const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lon}&units=metric`;
      const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': weatherApiKey
      };
      const weatherApiRes = await fetch(apiUrl, {
        method: 'GET',
        headers
      });
      const weatherApiData = await weatherApiRes.json();
      return weatherApiData.list;
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
};
