import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';

const weather = new WeatherInterface();

const app = document.getElementById('app');
const search = document.getElementById('searchTextField');

let location;
function initialize() {
  const options = {
    types: ['(cities)']
  };
  const autocomplete = new google.maps.places.Autocomplete(search, options);
  autocomplete.setFields(['geometry']);
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    location = place.geometry.location;

    console.log(location);
    search.blur();
    app.classList.toggle('active');
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
    app.classList.toggle('active');
    weather.clear();
    weather.state = 'disabled';
  }
});
