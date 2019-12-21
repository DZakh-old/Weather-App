const WeatherApi = require('./weatherApiGetRequest');
const GoogleApi = require('./GoogleApi');
const handleResponse = require('./handleResponse');

const utilities = {
  WeatherApi,
  GoogleApi,
  handleResponse
};

module.exports = utilities;
