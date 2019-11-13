const fetch = require('node-fetch');
require('dotenv').config();

module.exports = class WeatherApi {
  static async get(lat, lon) {
    try {
      const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lon}&units=metric`;
      const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.WEATHER_API_KEY
      };
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
};
