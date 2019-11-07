import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';

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

const myCity = 'san%20francisco%2Cus';

const weather = new WeatherInterface();

document.getElementById('app').innerHTML += `
  <button id="show">Показать</button>
`;

document.getElementById('show').addEventListener('click', () => {
  weather.displayWeatherInCity(myCity);
});
