const express = require('express');
const createError = require('http-errors');
const { GoogleApi } = require('../../utilities');

const router = express.Router();

router.get('/:request', async (req, res, next) => {
  try {
    const [input, session] = req.params.request.split('&');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&offset=3&session=${session}`;

    const predictionRes = await GoogleApi.processAutocomplete(apiUrl);
    const { statusCode, predictionList } = predictionRes;
    switch (statusCode) {
      case 429:
        // TODO: Fix error with fast typing
        console.log('Try again');
        return next(createError(429, statusCode));
      case 204:
        // TODO: Handle it on client side
        return res.status(204).end();
      default:
        return statusCode < 400
          ? res.status(statusCode).json(predictionList)
          : next(createError(statusCode));
    }
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
