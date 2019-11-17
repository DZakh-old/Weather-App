const Ajax = require('../Ajax');
// const { Ajax } = require('..'); // TODO: Learn why it doesn't work

const { googleApiKey } = require('../../config');

class GoogleApi {
  static async get(apiUrl) {
    try {
      const apiUrlWithKey = `${apiUrl}&key=${googleApiKey}`;
      return Ajax.get(apiUrlWithKey);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async processAutocomplete(apiUrl) {
    try {
      const autocompleteData = await GoogleApi.get(apiUrl);
      if (autocompleteData.status === 'OK') {
        const predictionsList = autocompleteData.predictions.map(
          ({ description, place_id: placeId }) => ({
            description,
            placeId
          })
        );
        return predictionsList;
      }
      throw new Error('No predictions');
    } catch (err) {
      return new Error(err);
    }
  }
}

module.exports = GoogleApi;
