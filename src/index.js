import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/WeatherInterface';
import DarkMode from './js/classes/DarkMode';

const weather = new WeatherInterface();

//
const search = document.getElementById('searchTextField');

// function initialize() {
//   const options = {
//     types: ['(cities)']
//   };
//   const autocomplete = new google.maps.places.Autocomplete(search, options);
//   autocomplete.setFields(['geometry']);
//   google.maps.event.addListener(autocomplete, 'place_changed', () => {
//     const place = autocomplete.getPlace();
//     const { location } = place.geometry;

//     search.blur();
//     weather.displayWeatherInCity(location);
//   });
// }
// google.maps.event.addDomListener(window, 'load', initialize);

search.addEventListener('change', async () => {
  search.blur();
  const input = encodeURIComponent(search.value);
  const res = await fetch(`/api/${input}`);
  if (res.status < 400) {
    const { weatherData, name } = await res.json();
    search.value = name;
    weather.displayWeather(weatherData);
  } else {
    // TODO: Specify only for 404 error
    search.value = 'Not Found!';
  }
});

search.addEventListener('focus', () => {
  if (weather.state === 'active') {
    search.value = '';
    weather.disable();
  }
});
//

DarkMode.activate();
