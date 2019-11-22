const express = require('express');

const router = express.Router();

const { GoogleApi, handleResponse } = require('../../utilities');

router.get('/:input', async (req, res, next) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    req.params.input
  )}&inputtype=textquery&fields=geometry,name`;
  const weatherRes = await GoogleApi.getProcessedWeather(apiUrl);
  handleResponse(weatherRes, res, next);
});

module.exports = router;
