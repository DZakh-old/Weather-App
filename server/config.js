require('dotenv').config();

module.exports = {
  weatherApiKey: process.env.WEATHER_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
  port: process.env.PORT
};
