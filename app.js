const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');

const { port } = require('./api/config');

const {
  findPlaceFromTextRoutes,
  detailsByPlaceIdRoutes,
  autocompleteRoutes
} = require('./api/routes');

const app = express();

app.use(express.static('dist'));

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://weather.dzakh.dev');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Access, Authorizatinon'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'GET');
    return res.status(200).json({ data: [] });
  }
  return next();
});

app.use('/api/findplacefromtext', findPlaceFromTextRoutes);
app.use('/api/detailsbyplaceid', detailsByPlaceIdRoutes);
app.use('/api/autocomplete', autocompleteRoutes);

app.use((req, res, next) => {
  next(createError(404, 'Not Found!'));
});

app.use((error, req, res, next) => {
  const { status } = error;
  console.error(error);
  // TODO: check if UserFacingError
  res.status(status || 500).json({ error });
});

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
