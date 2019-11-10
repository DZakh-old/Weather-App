import WeatherService from '../weather-service';
import WeatherCard from '../weather-card';

export default class WeatherInterface {
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

  displayWeatherInCity(weatherWrap, cityName) {
    // TODO: Add loading animation
    // weatherWrap.innerHTML = `
    //   <h2>In ${cityName}</h2>
    //   <p>Loading</p>
    // `;
    WeatherService.cityData(cityName)
      // .then(({ city, dataList }) => {
      .then(dataList => this._createWeatherCards(dataList))
      .then(cards => {
        const separator = `
          <div class="weather__separator" aria-disabled="true"></div>
        `;
        // weatherWrap.innerHTML = cards[3].build();
        weatherWrap.innerHTML = cards.map(card => card.build()).join(separator);
      });
  }
}
