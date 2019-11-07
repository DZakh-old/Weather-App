import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';

const app = document.getElementById('app');
app.innerHTML += `
  <header class="header">
    <h1 class="header__title">
      Weather in your town
    </h1>
  </header>
  <main class="main">
    <input type="text" name="" id="" class="main__search">
    <div id="weather">
      
    </div>
    <button id="show">Показать</button>
  </main>
`;

const weatherWrap = document.getElementById('weather');

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

document.getElementById('show').addEventListener('click', () => {
  weather.displayWeatherInCity(weatherWrap, myCity);
});
