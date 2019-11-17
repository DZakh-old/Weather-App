const express = require('express');
const createError = require('http-errors');
const { GoogleApi } = require('../../utilities');

const router = express.Router();

router.get('/:input', async (req, res, next) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    const weather = await GoogleApi.getProcessedWeather(url);
    const { status } = weather;
    // console.log(status);
    if (status && status !== 'OK' && status >= 400) {
      return next(createError(weather));
    }

    return res.status(200).json(weather);
  } catch (err) {
    // console.log(err);
    return next(createError(err));
  }
});

module.exports = router;
