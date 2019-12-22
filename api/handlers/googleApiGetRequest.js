const { googleApiKey } = require('../config');

const { sleep, Ajax } = require('../helpers');

const getGoogleUrlWithKey = url => {
  return `${url}&key=${googleApiKey}`;
};

const getGoogleStatusCode = ({ status }) => {
  switch (status) {
    case 'OK':
      return 200;
    case 'ZERO_RESULTS':
      return 204;
    case 'OVER_QUERY_LIMIT':
      return 429;
    default:
      return 500;
  }
};

const googleApiGetRequest = async (url, timesRepeated = 0, delay = 200) => {
  const urlWithKey = getGoogleUrlWithKey(url);
  const data = await Ajax.get(urlWithKey);
  data.statusCode = getGoogleStatusCode(data);
  if (data.statusCode >= 400 && timesRepeated < 3) {
    await sleep(delay);
    return googleApiGetRequest(url, timesRepeated + 1, delay * 2);
  }
  return data;
};

module.exports = googleApiGetRequest;
