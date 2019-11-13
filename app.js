const fetch = require('node-fetch');
const createError = require('http-errors');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('dist'));

const WeatherApi = require('./server/WeatherApi');

app.get('/api/:input', async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name&key=${process.env.GOOGLE_API_KEY}`;

    const placeApiRes = await fetch(apiUrl);
    const placeApiData = await placeApiRes.json();

    const place = placeApiData.candidates[0];
    if (place) {
      const { geometry, name } = place;
      const { lat, lng: lon } = geometry.location;
      const weatherData = await WeatherApi.get(lat, lon);
      res.json({ weatherData, name });
    } else {
      res.status(404).send(createError(404, 'This location does not exist!'));
    }
  } catch (err) {
    res.status(400).send(createError(400, 'Something went wrong!'));
  }
});

// app.get('/api/:latlon', async (req, res) => {
//   const { lat, lon } = req.params.latlon.split(',');
//   const weatherRes = await WeatherApi.get(lat, lon);
//   res.json(weatherRes);
// });

app.listen(3000, () => console.log('listening at http://localhost:3000/'));
