const fetch = require('node-fetch');
require('dotenv').config();

module.exports = class WeatherApi {
  static async get(apiUrl) {
    try {
      const apiUrlWithKey = `${apiUrl}&key=${process.env.GOOGLE_API_KEY}`;
      const googleApiRes = await fetch(apiUrlWithKey);
      return googleApiRes.json();
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
};
