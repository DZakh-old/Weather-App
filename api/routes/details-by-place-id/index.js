const express = require('express');
const createError = require('http-errors');
const { GoogleApi, WeatherApi } = require('../../utilities');

const router = express.Router();

router.get('/:place_id', async (req, res, next) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      req.params.place_id
    )}&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl);
    const { geometry, name: placeName } = placeData.result;
    const { lat, lng: lon } = geometry.location;
    const weatherData = await WeatherApi.getWeatherDataByLocation(lat, lon);
    return res.status(200).json({ weatherData, placeName });
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
