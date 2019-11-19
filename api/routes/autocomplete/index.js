const express = require('express');
const createError = require('http-errors');
const { GoogleApi } = require('../../utilities');

const router = express.Router();

router.get('/:request', async (req, res, next) => {
  try {
    const [input, session] = req.params.request.split('&');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&offset=3&session=${session}`;

    const predictionRes = await GoogleApi.processAutocomplete(url);
    const { statusCode, predictionList } = predictionRes;
    switch (statusCode) {
      case 200:
        return res.status(200).json(predictionRes);
      case 204:
      case 429:
        return res.status(statusCode).end();
      default:
        return next(createError(predictionRes));
    }
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
