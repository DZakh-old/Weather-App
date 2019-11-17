const express = require('express');
const { GoogleApi } = require('../../utilities');

const router = express.Router();

router.get('/:request', async (req, res, next) => {
  try {
    const [input, session] = req.params.request.split('&');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&offset=3&session=${session}`;

    // TODO: Maybe back this stuff from the class
    // TODO: Fix error with fast typing
    const autocompleteRes = await GoogleApi.processAutocomplete(apiUrl);
    // if (autocompleteRes entities ?
    res.status(200).json(autocompleteRes);
    // res.status(200).json(predictionsList);
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
