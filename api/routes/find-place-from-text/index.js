const express = require('express');
const createError = require('http-errors');
const { GoogleApi, WeatherApi } = require('../../utilities');

const router = express.Router();

router.get('/:input', async (req, res, next) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl);
    if (placeData.status !== 'OK') {
      return next(createError(placeData));
    }

    const [place] = placeData.candidates;
    if (!place) {
      return res.status(204).json({});
    }

    // TODO: function for it
    const { geometry, name: placeName } = place;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.getWeatherDataByLocation(lat, lon);
    return res.status(200).json({ weatherData, placeName });
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
