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
    if (status === 'ZERO_RESULTS') {
      return res.status(204).end();
    }
    if (status === 'OVER_QUERY_LIMIT') {
      // TODO: Fix error with fast typing
      return next(createError(429, status));
    }
    // TODO: Make a function for this \|/
    if (status && status !== 'OK' && (!+status || status >= 400)) {
      return next(createError(weather));
    }

    return res.status(status || 200).json(weather);
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
