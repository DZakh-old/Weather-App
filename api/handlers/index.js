const Ajax = require('./Ajax');
const WeatherApi = require('./WeatherApi');
const GoogleApi = require('./GoogleApi');
const handleResponse = require('./handleResponse');

const utilities = {
  Ajax,
  WeatherApi,
  GoogleApi,
  handleResponse
};

module.exports = utilities;
