const express = require('express');
const { GoogleApi, WeatherApi } = require('../../utilities');

const router = express.Router();

router.get('/:input', async (req, res, next) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl).catch(err =>
      console.log('\n\n\n\n' + err + '\n\n\n')
    );

    const [place] = placeData.candidates;
    if (!place) {
      res.status(404).send('This location does not exist!');
    }

    // TODO: function for it
    const { geometry, name: placeName } = place;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.getWeatherDataByLocation(lat, lon).catch(err =>
      console.log('\n\n\n\n' + err + '\n\n\n')
    );
    res.status(200).json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
