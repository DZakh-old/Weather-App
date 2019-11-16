const GoogleApi = require('../../GoogleApi');
const WeatherApi = require('../../WeatherApi');

module.exports = async (req, res) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      req.params.input
    )}&inputtype=textquery&fields=geometry,name`;

    const placeData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    const [place] = placeData.candidates;
    if (!place) {
      res.status(404).send('This location does not exist!');
    }

    // TODO: function for it
    const { geometry, name: placeName } = place;
    const { lat, lng: lon } = geometry.location;

    const weatherData = await WeatherApi.get(lat, lon).catch(e => console.error(e));
    res.json({ weatherData, placeName });
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
};
