const GoogleApi = require('../../GoogleApi');
const WeatherApi = require('../../WeatherApi');

module.exports = async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      req.params.place_id
    )}&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    const { geometry, name: placeName } = placeData.result;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.get(lat, lon).catch(e => console.error(e));
    res.json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
};
