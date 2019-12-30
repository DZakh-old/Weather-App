const express = require('express');

const router = express.Router();

const { processWeather, handleResponse } = require('../handlers').handlers;

router.get('/:input', async (req, res, next) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    req.params.input
  )}&inputtype=textquery&fields=geometry,name`;
  const weatherRes = await processWeather(apiUrl);
  handleResponse(weatherRes, res, next);
});

module.exports.findPlaceFromTextRoutes = router;
