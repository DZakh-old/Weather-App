const express = require('express');

const router = express.Router();

const { GoogleApi, handleResponse } = require('../../utilities');

router.get('/:place_id', async (req, res, next) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    req.params.place_id
  )}&fields=geometry,name`;
  const weatherRes = await GoogleApi.getProcessedWeather(apiUrl);
  handleResponse(weatherRes, res, next);
});

module.exports = router;
