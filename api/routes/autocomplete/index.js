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

    const predictionListRes = await GoogleApi.processAutocomplete(apiUrl);

    const { status } = predictionListRes;
    if (status) {
      switch (status) {
        case 'OVER_QUERY_LIMIT':
          // TODO: Fix error with fast typing
          console.log('Try again');
          return next(createError(predictionListRes));
        case 'ZERO_RESULTS':
          // TODO: Handle it on client side
          return res.status(204).json({});
        case 'OK':
          break;
        default:
          return status < 400
            ? res.status(status).json(predictionListRes)
            : next(createError(predictionListRes));
      }
    }
    return res.status(200).json(predictionListRes);
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
