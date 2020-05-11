const { weatherApiGetRequest } = require('./weatherApiGetRequest');
const { googleApiGetRequest } = require('./googleApiGetRequest');
const { processAutocomplete } = require('./processAutocomplete');
const { processWeather } = require('./processWeather');
const { handleResponse } = require('./handleResponse');

const handlers = {
  weatherApiGetRequest,
  googleApiGetRequest,
  processAutocomplete,
  processWeather,
  handleResponse
};

module.exports.handlers = handlers;
