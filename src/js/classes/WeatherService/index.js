// import { WeatherCard, Weather } from '..';
import WeatherCard from '../WeatherCard';
import Weather from '../Weather';
import elements from '../../app-elements';

const { app, weather: container } = elements;

export default class WeatherService {
  static toggleAppState() {
    app.classList.toggle('active');
  }

  static weatherIsShown() {
    return !!app.classList.contains('active');
  }

  static renderLoader() {
    container.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  }

  static renderWeather(weatherData) {
    const getParsedWeatherList = weatherDataArr => {
      return weatherDataArr.map((temp, i) => new Weather(temp, i));
    };

    const createWeatherCards = dataList => {
      const curHour = dataList[0].date.hour;
      let factor = Math.ceil((24 - curHour) / 3) || 8;
      const cards = [];

      cards.push(new WeatherCard(dataList.slice(0, 9)));
      for (let i = 1; i <= 3; i++) {
        cards.push(new WeatherCard(dataList.slice(factor, factor + 9)));
        factor += 8;
      }

      return cards;
    };

    const renderWeatherCards = cards => {
      const separator = `
        <div class="weather__separator" aria-disabled="true"></div>
      `;
      container.innerHTML = cards.map(card => card.render()).join(separator);
    };

    const addCardsSwitchListener = () => {
      const disableCards = cards => cards.forEach(card => card.classList.add('side'));
      const activateCard = card => card.classList.remove('side');

      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          disableCards(cards);
          activateCard(card);
        });
      });
    };

    /* ___ Main script ___ */
    const weatherList = getParsedWeatherList(weatherData);
    const cards = createWeatherCards(weatherList);

    renderWeatherCards(cards);
    addCardsSwitchListener();
  }

  static disable() {
    WeatherService.toggleAppState();
    container.innerHTML = '';
  }
}
