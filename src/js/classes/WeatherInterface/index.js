import WeatherCard from '../WeatherCard';
import Weather from '../Weather';

export default class WeatherInterface {
  constructor() {
    this.state = false;
  }

  _getParsedWeatherList(weatherData) {
    return weatherData.map((temp, i) => new Weather(temp, i));
  }

  _createWeatherCards(dataList) {
    const curHour = dataList[0].date.hour;
    let factor = Math.ceil((24 - curHour) / 3) || 8;
    const cards = [];

    cards.push(new WeatherCard(dataList.slice(0, 9)));
    for (let i = 1; i <= 3; i++) {
      cards.push(new WeatherCard(dataList.slice(factor, factor + 9)));
      factor += 8;
    }

    return cards;
  }

  _renderWeatherCards(cards) {
    const container = document.getElementById('weather');
    const separator = `
      <div class="weather__separator" aria-disabled="true"></div>
    `;
    container.innerHTML = cards.map(card => card.render()).join(separator);
  }

  _renderLoader() {
    const container = document.getElementById('weather');
    container.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  }

  _addCardsSwitchListener() {
    const cards = [...document.querySelectorAll('.card')];
    const disableCards = () => cards.forEach(card => card.classList.add('side'));
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        disableCards();
        card.classList.remove('side');
      });
    });
  }

  _toggleAppState() {
    const app = document.getElementById('app');
    app.classList.toggle('active');
  }

  displayWeather(weatherData) {
    this.state = 'active';
    this._toggleAppState();
    this._renderLoader();

    const weatherList = this._getParsedWeatherList(weatherData);
    const cards = this._createWeatherCards(weatherList);
    this._renderWeatherCards(cards);
    this._addCardsSwitchListener();
  }

  disable() {
    this._toggleAppState();
    this.state = 'disabled';

    document.getElementById('weather').innerHTML = '';
  }
}
