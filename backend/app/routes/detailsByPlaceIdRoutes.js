const app = (module.exports = require('express')());

const { processWeather, handleResponse } = require('../handlers').handlers;

app.get('/:place_id', async (req, res, next) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    req.params.place_id
  )}&fields=geometry,name`;
  const weatherRes = await processWeather(apiUrl);
  handleResponse(weatherRes, res, next);
});
