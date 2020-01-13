const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const { port } = require('./config').config;

const {
  findPlaceFromTextRoutes,
  detailsByPlaceIdRoutes,
  autocompleteRoutes
} = require('./routes').routes;

const app = express();

app.use(morgan('dev'));

const corsOptions = {
  origin: 'https://weather.dzakh.dev',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/findplacefromtext', findPlaceFromTextRoutes);
app.use('/api/detailsbyplaceid', detailsByPlaceIdRoutes);
app.use('/api/autocomplete', autocompleteRoutes);

app.use((req, res, next) => {
  res.redirect('/');
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status } = error;
  res.status(status || 500).end();
});

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
