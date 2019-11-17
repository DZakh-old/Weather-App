// const createError = require('http-errors'); TODO: Decide the destiny of the package later
const express = require('express');

const { port } = require('./api/config');

const {
  findPlaceFromTextRoutes,
  detailsByPlaceIdRoutes,
  autocompleteRoutes
} = require('./api/routes');

const app = express();

app.use(express.static('dist'));

app.use('/api/findplacefromtext', findPlaceFromTextRoutes);

app.use('/api/detailsbyplaceid', detailsByPlaceIdRoutes);

app.use('/api/autocomplete', autocompleteRoutes);

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
