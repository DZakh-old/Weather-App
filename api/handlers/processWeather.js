const { weatherApiGetRequest } = require('./weatherApiGetRequest');
const { googleApiGetRequest } = require('./googleApiGetRequest');

const unifyDifferentApiPlaceData = place => {
  return place.candidates ? place.candidates[0] : place.result;
};

const processWeather = async url => {
  const placeData = await googleApiGetRequest(url);
  const { statusCode } = placeData;

  if (statusCode !== 200) {
    return placeData;
  }

  const curPlaceData = unifyDifferentApiPlaceData(placeData);

  const { geometry, name } = curPlaceData;
  const { lat, lng: lon } = geometry.location;

  const { cod, list } = await weatherApiGetRequest({ lat, lon });
  return { statusCode: +cod || cod || 406, weatherData: list, placeName: name };
};

module.exports.processWeather = processWeather;
