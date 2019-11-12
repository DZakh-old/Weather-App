import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';
import DarkMode from './js/classes/dark-mode';

const weather = new WeatherInterface();

//
const search = document.getElementById('searchTextField');

function initialize() {
  const options = {
    types: ['(cities)']
  };
  const autocomplete = new google.maps.places.Autocomplete(search, options);
  autocomplete.setFields(['geometry']);
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    const { location } = place.geometry;

    search.blur();
    weather.displayWeatherInCity(location);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// search.addEventListener('change', () => {
//   console.log(location);
//   search.blur();
//   app.classList.toggle('active');
//   weather.displayWeatherInCity(location);
// });

search.addEventListener('focus', () => {
  if (weather.state === 'active') {
    search.value = '';
    weather.disable();
  }
});
//

DarkMode.activate();
