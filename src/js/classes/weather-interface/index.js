import WeatherService from '../weather-service';
import WeatherCard from '../weather-card';

export default class WeatherInterface {
  _createWeatherCards(tempList) {
    console.log(tempList);
    console.log(tempList[0].date);

    const curHour = tempList[0].date.time.hour;
    const factor = Math.ceil((24 - curHour) / 3);
    const cards = [];

    cards.push(new WeatherCard(tempList.slice(0, 8)));
    for (let i = 1; i <= 3; i++) {
      cards.push(new WeatherCard(tempList.slice(factor * i, (factor + 8) * i)));
    }

    return cards;
  }

  displayWeatherInCity(weatherWrap, cityName) {
    weatherWrap.innerHTML = `
      <h2>In ${cityName}</h2>
      <p>Loading</p>
    `;
    WeatherService.cityData(cityName)
      // .then(({ city, tempList }) => {
      .then(tempList => {
        return this._createWeatherCards(tempList);
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
        weatherWrap.innerHTML += `
          <p>${cards[0].mainTemp} deg now </p>
          <p>${cards[1].mainTemp} deg tommorow </p>
          <p>${cards[2].mainTemp} deg in two days </p>
          <p>${cards[3].mainTemp} deg later </p>

        `;
      });
  }
}
