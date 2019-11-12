const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.static('dist'));

app.get('/api/:latlon', async (req, res) => {
  const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?${req.params.latlon}&units=metric`;
  const apiHeaders = {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
  };
  const fetchData = await fetch(apiUrl, {
    method: 'GET',
    headers: apiHeaders
  });
  const jsonData = await fetchData.json();
  res.json(jsonData);
});

app.listen(3000, () => console.log('listening at http://localhost:3000/'));
