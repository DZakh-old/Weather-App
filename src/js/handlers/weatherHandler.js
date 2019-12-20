import { createWeatherCard } from './weatherCardFactory';
import { createWeatherSnatch } from './weatherSnatchFactory';
import { toggleAppState, isAppActive } from './appHandler';

import { renderHtmlInContainer } from '../helpers/renderHelper';
import { replaceElClassName } from '../helpers/classNameHelpers';

import { elements } from '../utils/app-elements';

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

const getParsedWeatherList = weatherDataArr => {
  return weatherDataArr.map((weatherData, i) => createWeatherSnatch(weatherData, i));
};

const createWeatherCardByNextCardIndex = (dataList, snatchesInDay, nextCardIndex) => {
  const isFirstCard = nextCardIndex <= snatchesInDay;
  const curCardIndex = isFirstCard ? 0 : nextCardIndex - snatchesInDay;

  return createWeatherCard(dataList.slice(curCardIndex, curCardIndex + snatchesInDay + 1));
};

const processCreationWeatherCards = (
  dataList,
  snatchesInDay,
  restNumberOfCards,
  nextCardIndex,
  cards = []
) => {
  if (restNumberOfCards === 0) {
    return cards;
  }

  return processCreationWeatherCards(
    dataList,
    snatchesInDay,
    restNumberOfCards - 1,
    nextCardIndex + snatchesInDay,
    [...cards, createWeatherCardByNextCardIndex(dataList, snatchesInDay, nextCardIndex)]
  );
};

const createWeatherCards = dataList => {
  const NUMBER_OF_CARDS = 4;
  const SNATCHES_IN_DAY = 8;
  const curHour = dataList[0].date.hour;
  const secondCardIndex = Math.ceil((24 - curHour) / 3) || SNATCHES_IN_DAY;

  return processCreationWeatherCards(dataList, SNATCHES_IN_DAY, NUMBER_OF_CARDS, secondCardIndex);
};

const renderWeatherCards = cards => {
  const separator = `
    <div class="weather__separator" aria-disabled="true"></div>
  `;
  const weatherHtml = cards.map(card => card.build()).join(separator);
  renderHtmlInContainer(weatherContainer, weatherHtml);
};

const disableCards = cards => cards.forEach(card => card.classList.add('side'));

const activateCard = card => card.classList.remove('side');

const switchActiveWeatherCardClass = i => {
  replaceElClassName(weatherContainer, /active-card-\d/g, `active-card-${i}`);
};

const addCardsSwitchListener = (className = 'card') => {
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

export const renderWeather = weatherDataArr => {
  const weatherList = getParsedWeatherList(weatherDataArr);
  const cards = createWeatherCards(weatherList);

  renderWeatherCards(cards);
  addCardsSwitchListener();
};
