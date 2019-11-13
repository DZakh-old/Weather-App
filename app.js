const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.use(express.static('dist'));

const WeatherApi = require('./server/weather-api');

app.get('/location/:input', async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}%20city&inputtype=textquery&fields=geometry&key=${process.env.GOOGLE_API_KEY}`;
    const placeRes = await fetch(apiUrl);
    const placeData = await placeRes.json();

    const { geometry } = placeData.candidates[0];
    if (geometry) {
      const { lat, lng: lon } = geometry.location;
      const weatherRes = await WeatherApi.get(lat, lon);
      res.json(weatherRes);
    } else {
      throw new Error("The place hasn't found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/:latlon', async (req, res) => {
  const { lat, lon } = req.params.latlon.split(',');
  const weatherRes = await WeatherApi.get(lat, lon);
  res.json(weatherRes);
});

app.listen(3000, () => console.log('listening at http://localhost:3000/'));
