const weatherApiGetRequest = require('./weatherApiGetRequest');
const googleApiGetRequest = require('./googleApiGetRequest');
const processAutocomplete = require('./processAutocomplete');
const processWeather = require('./processWeather');
const handleResponse = require('./handleResponse');

const utilities = {
  processAutocomplete,
  googleApiGetRequest,
  weatherApiGetRequest,
  processWeather,
  handleResponse
};

module.exports = utilities;
