const { googleApiGetRequest } = require('./googleApiGetRequest');

const processAutocomplete = async url => {
  const autocompleteData = await googleApiGetRequest(url);
  const { statusCode } = autocompleteData;

  if (statusCode !== 200) {
    return autocompleteData;
  }

  const predictionList = autocompleteData.predictions.map(({ description, place_id: placeId }) => ({
    description,
    placeId
  }));

  return { statusCode, predictionList };
};

module.exports.processAutocomplete = processAutocomplete;
