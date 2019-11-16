// const createError = require('http-errors'); TODO: Decide the destiny of the package later
const express = require('express');

const { port } = require('./server/config');

const {
  findPlaceFromTextMiddleware,
  detailsByPlaceId,
  autocomplete
} = require('./server/middlewares');

const app = express();

app.use(express.static('dist'));

app.get('/api/findplacefromtext/:input', findPlaceFromTextMiddleware);

app.get('/api/detailsbyplaceid/:place_id', detailsByPlaceId);

app.get('/api/autocomplete/:request', autocomplete);

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
