const Ajax = require('./Ajax');
const WeatherApi = require('./WeatherApi');
const GoogleApi = require('./GoogleApi');
const handleResponse = require('./handle-response');

const utilities = {
  Ajax,
  WeatherApi,
  GoogleApi,
  handleResponse
};

module.exports = utilities;
