const createError = require('http-errors');
const express = require('express');

const { port } = require('./server/config');

const WeatherApi = require('./server/WeatherApi');
const GoogleApi = require('./server/GoogleApi');

const app = express();

app.use(express.static('dist'));

app.get('/api/findplacefromtext/:input', async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    const [place] = placeData.candidates;
    if (!place) {
      res.status(404).send(createError(404, 'This location does not exist!'));
    }

    // TODO: function for it
    const { geometry, name: placeName } = place;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.get(lat, lon).catch(e => console.error(e));
    res.json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send(createError(400, 'Something went wrong!'));
  }
});

app.get('/api/detailsbyplaceid/:place_id', async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      req.params.place_id
    )}&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    const { geometry, name: placeName } = placeData.result;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.get(lat, lon).catch(e => console.error(e));
    res.json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send(createError(400, 'Something went wrong!'));
  }
});

app.get('/api/autocomplete/:request', async (req, res) => {
  try {
    const [input, session] = req.params.request.split('&');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&offset=3&session=${session}`;

    // TODO: Maybe back this stuff from the class
    // TODO: Fix error with fast typing
    const autocompleteData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    if (autocompleteData.status === 'OK') {
      const autocompleteList = autocompleteData.predictions.map(
        ({ description, place_id: placeId }) => ({
          description,
          placeId
        })
      );
      res.json(autocompleteList);
    }
  } catch (err) {
    res.status(400).send(createError(400, 'Something went wrong!'));
  }
});

app.listen(port || 3000, () => console.log(`listening at http://localhost:${port || 3000}/`));
