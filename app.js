// const createError = require('http-errors'); TODO: Decide the destiny of the package later
const express = require('express');
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
    return res.status(200).json({});
  }
  next();
});

app.use('/api/findplacefromtext', findPlaceFromTextRoutes);
app.use('/api/detailsbyplaceid', detailsByPlaceIdRoutes);
app.use('/api/autocomplete', autocompleteRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
