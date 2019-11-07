import WeatherService from '../weather-service';
import WeatherCard from '../weather-card';

export default class WeatherInterface {
  _createWeatherCards(dataList) {
    const curHour = dataList[0].date.hour;
    const factor = Math.ceil((24 - curHour) / 3) || 1;
    const cards = [];

    cards.push(new WeatherCard(dataList.slice(0, 8)));
    for (let i = 1; i <= 3; i++) {
      cards.push(new WeatherCard(dataList.slice(factor * i, factor * i + 8)));
    }

    return cards;
  }

  displayWeatherInCity(weatherWrap, cityName) {
    weatherWrap.innerHTML = `
      <h2>In ${cityName}</h2>
      <p>Loading</p>
    `;
    WeatherService.cityData(cityName)
      // .then(({ city, dataList }) => {
      .then(dataList => this._createWeatherCards(dataList))
      .then(cards => {
        weatherWrap.innerHTML += cards[0].build();
      });
  }
}
