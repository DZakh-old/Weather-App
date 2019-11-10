import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';

const myCity = 'san%20francisco%2Cus';

const app = document.getElementById('app');

const search = document.getElementById('searchTextField');
// const options = {
//   types: ['(cities)']
// };

// const autocomplete = new google.maps.places.Autocomplete(input, options);

// Google server-side map API
// const input = 'london';
// const key = 'AIzaSyAv3Kya6-hZVLqTmx_OE-herfkuTQR4h1w';
// // const mapUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name&key=${key}`;

// Ajax.get(mapUrl)
//   .then(res => {
//     console.log(res);

//     document.getElementById('app').innerHTML += `
//       ${JSON.stringify(res)}
//     `;
//   })
//   .finally(res => {
//     console.log(`Finishing promise ${res}`);
//   });

const weather = new WeatherInterface();

search.addEventListener('change', e => {
  // console.log(autocomplete.getPlace());

  app.classList.toggle('active');
  weather.displayWeatherInCity(myCity);
});
