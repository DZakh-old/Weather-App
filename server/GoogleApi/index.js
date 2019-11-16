const fetch = require('node-fetch');
const { googleApiKey } = require('../config');

module.exports = class WeatherApi {
  static async get(apiUrl) {
    try {
      const apiUrlWithKey = `${apiUrl}&key=${googleApiKey}`;
      const googleApiRes = await fetch(apiUrlWithKey);
      return googleApiRes.json();
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
};
