const express = require('express');
const createError = require('http-errors');
const { GoogleApi } = require('../../utilities');

const router = express.Router();

router.get('/:input', async (req, res, next) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    // TODO: DRY!
    const weatherRes = await GoogleApi.getProcessedWeather(url);
    const { statusCode } = weatherRes;
    switch (statusCode) {
      case 200:
        return res.status(200).json(weatherRes);
      case 204:
        return res.status(204).end();
      case 429:
        return next(createError(429, 'Over quota limit! Try again in a day...'));
      default:
        return next(createError(weatherRes));
    }
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
