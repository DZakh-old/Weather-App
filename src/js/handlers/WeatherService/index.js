import { createWeatherCard, buildWeatherCard } from '../weatherCardFactory';
import { createWeatherSnatch } from '../createWeatherSnatch';
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

  static replaceClassName(regEx, replacement) {
    container.className = container.className.replace(regEx, replacement);
  }

  static renderLoader() {
    this.renderHtml(`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
  }

  static renderWeather(weatherData) {
    const getParsedWeatherList = weatherDataArr => {
      return weatherDataArr.map((tempData, i) => createWeatherSnatch(tempData, i));
    };

    const createWeatherCards = dataList => {
      const createWeatherCardFromDataIndex = i => createWeatherCard(dataList.slice(i, i + 8 + 1));

      const curHour = dataList[0].date.hour;
      const factor = Math.ceil((24 - curHour) / 3) || 8;
      const cards = [];

      cards.push(createWeatherCardFromDataIndex(0));
      for (let i = factor; i < factor + 3 * 8; i += 8) {
        cards.push(createWeatherCardFromDataIndex(i));
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
      const switchActiveWeatherCardClass = i => {
        this.replaceClassName(/active-card-\d/g, `active-card-${i}`);
      };

      this.replaceClassName(/active-card-\d/g, '');
      container.classList.add('active-card-0');

      const cards = [...document.querySelectorAll(`.${className}`)];

      cards.forEach((card, i) => {
        card.addEventListener('mouseenter', () => {
          disableCards(cards);
          activateCard(card);
          switchActiveWeatherCardClass(i);
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
