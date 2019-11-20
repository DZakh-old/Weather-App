import WeatherCard from '../WeatherCard';
import Weather from '../Weather';
import elements from '../../app-elements';

const { app, weather: container } = elements;

export default class WeatherService {
  static toggleAppState() {
    app.classList.toggle('active');
  }

  static disable() {
    WeatherService.toggleAppState();
    this.renderHtml('');
  }

  static weatherIsShown() {
    return !!app.classList.contains('active');
  }

  static renderHtml(html) {
    container.innerHTML = html;
  }

  static renderLoader() {
    this.renderHtml(`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
  }

  static renderWeather(weatherData) {
    const getParsedWeatherList = weatherDataArr => {
      return weatherDataArr.map((tempData, i) => new Weather(tempData, i));
    };

    const createWeatherCards = dataList => {
      // TODO: Think about recursion or add a function
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
      const weatherHtml = cards.map(card => card.build()).join(separator);
      this.renderHtml(weatherHtml);
    };

    const addCardsSwitchListener = (className = 'card') => {
      const disableCards = cards => cards.forEach(card => card.classList.add('side'));
      const activateCard = card => card.classList.remove('side');

      const cards = [...document.querySelectorAll(`.${className}`)];

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
}
