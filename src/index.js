import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import WeatherInterface from './js/classes/weather-interface';

const myCity = 'san%20francisco%2Cus';

const app = document.getElementById('app');
app.innerHTML += `
  <header class="header container">
    <h1 class="header__title">
      Weather in your town
    </h1>
    <input type="text" name="" id="searchTextField" placeholder="Doesn't work" class="main__search">
  </header>
  <main class="main container">
    <div id="weather">
      
    </div>
  </main>
  <footer class="footer container">
    <button id="show" style="width: 100%; height: 100%; background: rgba(0,0,0,0.2)">Показать</button>
  </footer>
`;

const input = document.getElementById('searchTextField');
const options = {
  types: ['(cities)']
};

const autocomplete = new google.maps.places.Autocomplete(input, options);

const weatherWrap = document.getElementById('weather');

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

document.getElementById('show').addEventListener('click', () => {
  console.log(autocomplete.getPlace());

  weather.displayWeatherInCity(weatherWrap, myCity);
});
