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
    // console.log(cards);

    return cards;
  }

  displayWeatherInCity(weatherWrap, cityName) {
    weatherWrap.innerHTML = `
      <h2>In ${cityName}</h2>
      <p>Loading</p>
    `;
    WeatherService.cityData(cityName)
      // .then(({ city, dataList }) => {
      .then(dataList => {
        return this._createWeatherCards(dataList);
        // <p>${curTemp.temp} deg now </p>
        // <p>${curTemp.date.time} time of test </p>
        // <p>${curTemp.date.day} date of test </p>
        // <p>${curTemp.date.weekday} day of test </p>
        // <p>${curTemp.date.month} month of test </p>
        // <p>${curTemp.pressure} presure </p>
        // <p>${curTemp.humidity} humidity </p>
        // <p>${curTemp.status} status </p>
        // <p>${curTemp.clouds} clouds </p>
        // <p>${curTemp.wind.direction} wind direction </p>
        // <p>${curTemp.wind.speed} wind speed </p>
      })
      .then(cards => {
        console.log(cards[0].wind);
        weatherWrap.innerHTML += `
          <p>${cards[0].day} deg now </p>
          <p>${cards[1].day} deg tommorow </p>
          <p>${cards[2].day} deg in two days </p>
          <p>${cards[3].day} deg later </p>

        `;
      });
  }
}
