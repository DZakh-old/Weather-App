const createError = require('http-errors');
const Ajax = require('../Ajax');

const { googleApiKey } = require('../../config');

class GoogleApi {
  static get(apiUrl) {
    try {
      const apiUrlWithKey = `${apiUrl}&key=${googleApiKey}`;
      return Ajax.get(apiUrlWithKey);
    } catch (err) {
      throw createError(err);
    }
  }

  static async processAutocomplete(apiUrl) {
    try {
      const autocompleteRes = await GoogleApi.get(apiUrl);
      if (autocompleteRes.status !== 'OK') {
        return autocompleteRes;
      }
      return autocompleteRes.predictions.map(({ description, place_id: placeId }) => ({
        description,
        placeId
      }));
    } catch (err) {
      throw createError(err);
    }
  }
}

module.exports = GoogleApi;
