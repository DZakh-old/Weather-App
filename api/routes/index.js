const { findPlaceFromTextRoutes } = require('./findPlaceFromTextRoutes');
const { detailsByPlaceIdRoutes } = require('./detailsByPlaceIdRoutes');
const { autocompleteRoutes } = require('./autocompleteRoutes');

module.exports.routes = {
  findPlaceFromTextRoutes,
  detailsByPlaceIdRoutes,
  autocompleteRoutes
};
