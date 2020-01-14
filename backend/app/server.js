const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const { port } = require('../config').config;

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));

const corsOptions = {
  origin: 'https://weather.dzakh.dev',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use(routes);

app.listen(port || 3000, () => console.log(`listening to http://localhost:${port || 3000}/`));
