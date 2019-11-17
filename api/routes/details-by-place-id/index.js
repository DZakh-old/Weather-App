const express = require('express');
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
    res.status(200).json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
