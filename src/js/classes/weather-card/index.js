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
    if (this.tempId === 7) {
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
  buildWind() {
    return `
      <div class="wind__speed">
        ${this.wind.speed}
        <span class="wind__speed-measure">
          km/h
        </span>
      </div>
      <div class="wind__icon">
        <svg class="wind__icon-svg" fill="rgba(114, 184, 214, 0.35)" x="0" y="0" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
          <g><path d="M288.7,396.2c70.4,0,148.5-21.4,229.7-79.6c222-159.3,399.7,7.7,419.6,27.6c12.3,12.2,30.6,12.2,42.9,0c12.3-12.3,12.3-30.6,0-42.9c-23-23-235.8-222-499.2-33.7C259.6,426.8,82,259.9,62.1,240c-12.2-12.2-30.6-12.2-42.9,0c-12.3,12.3-12.3,30.6,0,42.9C71.3,336.5,169.3,396.2,288.7,396.2z"/><path d="M481.6,469.7c-125.6,90.3-237.3,73.5-307.8,45.9c-15.3-6.1-33.7,1.5-39.8,16.8c-6.1,15.3,1.5,33.7,16.8,39.8c36.8,15.3,84.2,27.6,136.3,27.6c67.4,0,147-19.9,229.7-79.6c222-159.3,399.7,7.7,419.6,27.6c12.3,12.3,30.6,12.3,42.9,0c12.2-12.2,12.2-30.6,0-42.9C957.8,480.4,746.5,281.4,481.6,469.7z"/><path d="M847.6,632c-85.8-33.7-217.4-53.6-366,52.1c-222,159.3-399.7-7.7-419.6-27.6c-12.2-12.3-30.6-12.3-42.9,0c-12.3,12.3-12.3,30.6,0,42.9C71.3,753,169.3,812.7,288.7,812.7c70.4,0,148.5-21.4,229.7-79.6c125.6-90.3,237.3-75,307.8-45.9c15.3,6.1,33.7-1.5,39.8-16.8C872.1,655,864.4,638.1,847.6,632z"/></g>
        </svg>
      </div>
      <div class="wind__direction">
        ${this.wind.direction}
      </div>
    `;
  }

  build() {
    return `
      <section class="card">
        <header class="card__head">
          <h2 class="card__day">
            ${this.day}
          </h2>
          <div class="card__temp">
            ${this.temp}&deg;
          </div>
          <div class="card__weather">
            <span class="card__weather-icon icon-weather-${this.weather.iconId}" aria-label="${
      this.weather.status
    }"></span>
            <p class="card__weather-status">
              ${this.weather.status}
            </p>
          </div>
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
                <!-- Pressure.append(this.pressure) -->
                ${this.pressure}
              </div>
            </li>
            <li class="details__block">
              <h3 class="details__title">
                Clouds
              </h3>
              <div class="details__content clouds">
                <!-- Clouds.append(this.clouds) -->
                ${this.clouds}
              </div>
            </li>
          </ul>
        </main>
      </section>
    `;
  }
}
