import WeatherService from '../weather-service';
import WeatherCard from '../weather-card';

export default class WeatherInterface {
  constructor() {
    this.state = false;
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

  displayWeatherInCity(cityName) {
    this.state = 'active';
    // TODO: Add loading animation
    // weatherWrap.innerHTML = `
    //   <h2>In ${cityName}</h2>
    //   <p>Loading</p>
    // `;
    WeatherService.getWeatherDataInCity(cityName)
      // .then(({ city, dataList }) => {
      .then(dataList => this._createWeatherCards(dataList))
      .then(cards => {
        this._renderWeatherCards(cards);
        this._addCardsSwitchListener();
      });
  }

  clear() {
    document.getElementById('weather').innerHTML = '';
  }
}
