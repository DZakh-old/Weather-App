const { weatherApiKey } = require('../config').config;
const { Ajax } = require('../helpers').helpers;

const weatherApiGetRequest = async ({ lat, lon }) => {
  const url = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lon}&units=metric`;
  const headers = {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': weatherApiKey
  };
  return Ajax.get(url, headers);
};

module.exports.weatherApiGetRequest = weatherApiGetRequest;
