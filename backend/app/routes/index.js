const app = (module.exports = require('express')());

app.get('/', (req, res) => {
  res.send({ msg: 'Hello! Server is up and running!' });
});

app.use('/api/autocomplete', require('./autocompleteRoutes'));
app.use('/api/detailsByPlaceId', require('./detailsByPlaceIdRoutes'));
app.use('/api/findPlaceFromText', require('./findPlaceFromTextRoutes'));

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found!' });
});
