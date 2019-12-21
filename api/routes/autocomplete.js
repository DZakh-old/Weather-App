const express = require('express');

const router = express.Router();

const { GoogleApi, handleResponse } = require('../handlers');

router.get('/:request', async (req, res, next) => {
  const [input, session] = req.params.request.split('&');
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=(cities)&offset=3&session=${session}`;
  const autocompleteRes = await GoogleApi.processAutocomplete(apiUrl);
  handleResponse(autocompleteRes, res, next);
});

module.exports = router;
