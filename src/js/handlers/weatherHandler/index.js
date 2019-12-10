import { createWeatherCard } from '../weatherCardFactory';
import { createWeatherSnatch } from '../weatherSnatchFactory';
import { toggleAppState, isAppActive } from '../appHandler';

import { renderHtmlInContainer } from '../../helpers/renderHelpers';
import { replaceElClassName } from '../../helpers/classNameHelpers';

import { elements } from '../../appElements';

const { weatherContainer } = elements;

export const switchOffWeather = () => {
  toggleAppState();
  renderHtmlInContainer(weatherContainer, '');
};

export const isWeatherShown = isAppActive;

export const renderLoaderInWeatherContainer = () => {
  renderHtmlInContainer(
    weatherContainer,
    `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
  );
};
export default class WeatherService {
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
      renderHtmlInContainer(weatherContainer, weatherHtml);
    };

    const addCardsSwitchListener = (className = 'card') => {
      const disableCards = cards => cards.forEach(card => card.classList.add('side'));
      const activateCard = card => card.classList.remove('side');
      const switchActiveWeatherCardClass = i => {
        replaceElClassName(weatherContainer, /active-card-\d/g, `active-card-${i}`);
      };

      replaceElClassName(weatherContainer, /active-card-\d/g, '');
      weatherContainer.classList.add('active-card-0');

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
