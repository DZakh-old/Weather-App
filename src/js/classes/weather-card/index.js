export default class WeatherCard {
  constructor(arr) {
    this._tempData = arr;
    this.tempId = arr[0].id;
  }

  _getSum(prop) {
    return this._tempData.reduce((acc, cur) => acc + cur[prop], 0);
  }

  _getAverage(prop) {
    return this._getSum(prop) / this._tempData.length;
  }

  _getCardAverage(prop) {
    if (this.tempId === 0) {
      return this._tempData[0][prop];
    }
    return Math.round(this._getAverage(prop));
  }

  _getMostFrequent(arr) {
    const counterObj = {};
    arr.forEach(number => (number in counterObj ? counterObj[number]++ : (counterObj[number] = 1)));

    let mostFrequent;
    for (let key in counterObj) {
      if (counterObj[key] > (counterObj[mostFrequent] || 0)) {
        mostFrequent = key;
      }
    }

    return mostFrequent;
  }

  get temp() {
    return this._getCardAverage('temp');
  }

  get day() {
    if (this.tempId === 0) {
      return 'Today';
    }
    if (this.tempId <= 8) {
      return 'Tomorrow';
    }

    const { weekday, day, month } = this._tempData[0].date;

    return `${weekday}, ${day} ${month}`;
  }

  get weather() {
    if (this.tempId === 0) {
      const { code, status, iconId } = this._tempData[0].weather;
      return {
        code,
        status,
        iconId
      };
    }

    const codes = this._tempData.map(tempData => tempData.weather.code.toString().match(/\d/g));

    const getMostFrequentCode = codes => {
      let mostFrequentCode = '';

      for (let i = 0; i < 3; i++) {
        const getFollowingNumbers = () => {
          return codes
            .filter(code => (i ? code[i - 1] === mostFrequentCode.slice(i - 1) : true))
            .map(code => code[i]);
        };

        mostFrequentCode += this._getMostFrequent(getFollowingNumbers());
      }

      return +mostFrequentCode;
    };

    const cardWeatherCode = getMostFrequentCode(codes);
    const cardWeather = this._tempData.find(tempData => tempData.weather.code === cardWeatherCode);

    const { code, status, iconId } = cardWeather.weather;
    return {
      code,
      status,
      iconId
    };
  }

  get humidity() {
    return this._getCardAverage('humidity');
  }

  get pressure() {
    return this._getCardAverage('pressure');
  }

  get clouds() {
    return this._getCardAverage('clouds');
  }

  get wind() {
    const getWindDirectionById = id => {
      id = 4;
      switch (id) {
        case 1:
          return 'North';
        case 2:
          return 'North-east';
        case 3:
          return 'East';
        case 4:
          return 'South-east';
        case 5:
          return 'South';
        case 6:
          return 'South-west';
        case 7:
          return 'West';
        case 0:
          return 'North-west';
        default:
          throw new Error('Cannot count wind directoin');
      }
    };

    return {
      speed: this._getCardAverage('windSpeed'),
      direction: getWindDirectionById(this._getCardAverage('windDirection'))
    };
  }

  buildSnatches() {
    return this._tempData
      .map(({ id, date, weather, temp }) => {
        const time = id === 0 ? 'Now' : date.time;
        return `
          <li class="snatches__item">
            <p class="snatches__time">
              ${time}
            </p>
            <span class="snatches__icon icon-weather-${weather.iconId}" aria-label="${weather.status}"></span>
            <div class="snatches__temp">
              ${temp}&deg;
            </div>
          </li>              
        `;
      })
      .join('');
  }

  buildHumidity() {
    return `
      <div class="humidity__value">
        ${this.humidity}%
      </div>
      <div class="humidity__progress-bar progress-bar" aria-lable="Humidity progress bar">
        <svg class="progress-bar__svg" viewBox="-1 -1 34 34">
          <circle cx="16" cy="16" r="15.9155"
                  class="progress-bar__background" />
          <circle cx="16" cy="16" r="15.9155" stroke-dashoffset="${100 - this.humidity}"
                  class="progress-bar__progress js-progress-bar" id="progress-bar"/>
        </svg>  
      </div>
    `;
  }

  // TODO: Use css variable for colors and insert its value here
  buildWind() {
    return `
      <div class="wind__speed">
        ${this.wind.speed}
        <span class="wind__speed-measure">
          km/h
        </span>
      </div>
      <div class="wind__icon">
        <svg class="wind__icon-svg" fill="${'rgba(114, 184, 214, 0.35)'}" x="0" y="0" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
          <g><path d="M288.7,396.2c70.4,0,148.5-21.4,229.7-79.6c222-159.3,399.7,7.7,419.6,27.6c12.3,12.2,30.6,12.2,42.9,0c12.3-12.3,12.3-30.6,0-42.9c-23-23-235.8-222-499.2-33.7C259.6,426.8,82,259.9,62.1,240c-12.2-12.2-30.6-12.2-42.9,0c-12.3,12.3-12.3,30.6,0,42.9C71.3,336.5,169.3,396.2,288.7,396.2z"/><path d="M481.6,469.7c-125.6,90.3-237.3,73.5-307.8,45.9c-15.3-6.1-33.7,1.5-39.8,16.8c-6.1,15.3,1.5,33.7,16.8,39.8c36.8,15.3,84.2,27.6,136.3,27.6c67.4,0,147-19.9,229.7-79.6c222-159.3,399.7,7.7,419.6,27.6c12.3,12.3,30.6,12.3,42.9,0c12.2-12.2,12.2-30.6,0-42.9C957.8,480.4,746.5,281.4,481.6,469.7z"/><path d="M847.6,632c-85.8-33.7-217.4-53.6-366,52.1c-222,159.3-399.7-7.7-419.6-27.6c-12.2-12.3-30.6-12.3-42.9,0c-12.3,12.3-12.3,30.6,0,42.9C71.3,753,169.3,812.7,288.7,812.7c70.4,0,148.5-21.4,229.7-79.6c125.6-90.3,237.3-75,307.8-45.9c15.3,6.1,33.7-1.5,39.8-16.8C872.1,655,864.4,638.1,847.6,632z"/></g>
        </svg>
      </div>
      <div class="wind__direction">
        ${this.wind.direction}
      </div>
    `;
  }

  buildPressure() {
    return `
      <div class="pressure__icon">
        <svg class="pressure__icon-svg" fill="${'rgb(51, 97, 153)'}" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
          <path d="m 39,0 c -1.47285,0 -1.490854,2 0,2 h 9 v 6 h -4 c -1.584399,0 -1.602362,2 0,2 h 4 v 6 h -4 c -1.357031,0 -1.422365,2 0,2 h 4 v 6 h -9 c -1.28207,0 -1.241207,2 0,2 h 9 v 6 h -4 c -1.523572,0 -1.378108,2 0,2 h 4 v 6 h -4 c -1.345315,0 -1.521105,2 0,2 h 4 v 6 h -9 c -1.347969,0 -1.223916,2 0,2 h 10 c 0.825914,0.07681 1.037453,-0.370834 1,-1 V 1 C 50.001907,0.36134979 49.797703,0 49,0 Z M 10,7 C 9.9407851,12.731404 9.6313576,16.22977 9.09375,18.59375 8.5561424,20.95773 7.8746918,22.194313 7.125,23.5625 6.3753082,24.930687 5.5563681,26.429171 4.96875,29 4.4701961,31.181173 4.1258695,34.212039 4.03125,38.59375 l -2.3125,-2.3125 c -0.96038707,-0.960387 -2.24122973,0.63377 -1.4375,1.4375 l 4,4 c 0.7447382,0.649459 0.7330581,0.634297 1.4375,0 l 4,-4 c 0.820285,-0.820285 -0.4058389,-2.469161 -1.4375,-1.4375 l -2.25,2.25 c 0.09451,-4.223393 0.4232044,-7.085894 0.875,-9.0625 0.5373819,-2.351046 1.2184418,-3.568187 1.96875,-4.9375 0.7503082,-1.369313 1.568858,-2.917105 2.15625,-5.5 C 11.618642,16.448355 12.11172,12.817217 12,7 11.965293,5.1928205 10.018555,5.2040275 10,7 Z m 11,0 c 0.06965,5.731287 -0.368642,9.22977 -0.90625,11.59375 -0.537608,2.36398 -1.219058,3.600563 -1.96875,4.96875 -0.749692,1.368187 -1.568632,2.866671 -2.15625,5.4375 -0.498554,2.181173 -0.84288,5.212039 -0.9375,9.59375 l -2.3125,-2.3125 c -1.284679,-1.284679 -2.488575,0.386425 -1.4375,1.4375 l 4,4 c 0.675041,0.648673 0.707392,0.635506 1.4375,0 l 4,-4 c 0.876135,-0.876135 -0.422176,-2.452824 -1.4375,-1.4375 l -2.25,2.25 c 0.09451,-4.223393 0.423204,-7.085894 0.875,-9.0625 0.537382,-2.351046 1.218442,-3.568187 1.96875,-4.9375 0.750308,-1.369313 1.568858,-2.917105 2.15625,-5.5 C 22.618642,16.448355 22.976686,12.818243 23,7 23.006284,5.431722 20.980014,5.3553719 21,7 Z m 11,0 c -0.01932,5.731677 -0.368642,9.22977 -0.90625,11.59375 -0.537608,2.36398 -1.219058,3.600563 -1.96875,4.96875 -0.749692,1.368187 -1.568632,2.866671 -2.15625,5.4375 -0.498554,2.181173 -0.84288,5.212039 -0.9375,9.59375 l -2.3125,-2.3125 c -0.902483,-0.902483 -2.325213,0.549787 -1.4375,1.4375 l 4,4 c 0.709988,0.581278 0.720074,0.546706 1.4375,0 l 4,-4 c 0.887493,-0.887493 -0.484196,-2.390804 -1.4375,-1.4375 l -2.25,2.25 c 0.09451,-4.223393 0.423204,-7.085894 0.875,-9.0625 0.537382,-2.351046 1.218442,-3.568187 1.96875,-4.9375 0.750308,-1.369313 1.568858,-2.917105 2.15625,-5.5 C 33.618642,16.448355 33.952012,12.818092 34,7 34.014134,5.286423 32.005705,5.3080184 32,7 Z" />
        </svg>
      </div>
      <div class="pressure__value">
        ${this.pressure} mb
      </div>
    `;
  }

  buildClouds() {
    return `
      <div class="clouds__value">
        ${this.clouds}
      </div>
    `;
  }

  build() {
    return `
      <section class="card">
        <header class="card__head">
          <h2 class="card__day">
            <span class="card__weather-icon icon-weather-${this.weather.iconId}" aria-label="${
      this.weather.status
    }"></span>
            ${this.day}
          </h2>
          <div class="card__temp">
            ${this.temp}&deg;
          </div>
          <p class="card__weather-status">
            ${this.weather.status}
          </p>
        </header>
        <main class="card__info">
          <div class="card__snatches snatches">
            <ul class="snatches__bar">
              ${this.buildSnatches()}
            </ul>
          </div>
          <ul class="card__details details">
            <li class="details__block">
              <h3 class="details__title">
                Humidity
              </h3>
              <div class="details__content humidity">
                ${this.buildHumidity()}
              </div>
            </li>
            <li class="details__block">
              <h3 class="details__title">
                Wind
              </h3>
              <div class="details__content wind">
                ${this.buildWind()}
              </div>
            </li>
            <li class="details__block">
              <h3 class="details__title">
                Pressure
              </h3>
              <div class="details__content pressure">
                ${this.buildPressure()}
              </div>
            </li>
            <li class="details__block">
              <h3 class="details__title">
                Clouds
              </h3>
              <div class="details__content clouds">
                ${this.buildClouds()}
              </div>
            </li>
          </ul>
        </main>
      </section>
    `;
  }
}
