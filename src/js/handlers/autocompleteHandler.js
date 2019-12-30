import { submitCitySearch } from './searchProcessing';

import { elements } from '../utils/app-elements';

import { Ajax } from '../helpers/Ajax';
import { renderHtmlInContainer } from '../helpers/renderHelpers';

const { autocompleteContainer } = elements;

export const hideAutocompletePredictions = () => {
  autocompleteContainer.classList.remove('active-autocomplete');
};

export const showAutocompletePredictions = () => {
  autocompleteContainer.classList.add('active-autocomplete');
};

const removePrediction = () => {
  autocompleteContainer.removeChild(autocompleteContainer.firstChild);
};

export const hasAutocompletePredictions = () => {
  return !!autocompleteContainer.firstChild;
};

export const clearAutocomplete = () => {
  hideAutocompletePredictions();
  while (hasAutocompletePredictions()) {
    removePrediction();
  }
};

const buildAutocompleteHtml = predictions => {
  const separator = `
    <div class="search__autocomplete-separator" aria-disabled="true"></div>
  `;

  return predictions
    .map(({ description }) => {
      return `
        <button class="search__autocomplete-prediction">${description}</button>
      `;
    })
    .join(separator);
};

const activatePredictionsEventListeners = predictions => {
  const predictionElems = [...document.querySelectorAll('.search__autocomplete-prediction')];
  predictionElems.forEach((predictionElem, i) => {
    predictionElem.addEventListener('blur', () => {
      hideAutocompletePredictions();
    });
    predictionElem.addEventListener('focus', () => {
      showAutocompletePredictions();
    });
    predictionElem.addEventListener('click', () => {
      submitCitySearch(predictions[i]);
      clearAutocomplete();
    });
  });
};

export const renderAutocompletePredictions = predictions => {
  const autocompleteHtml = buildAutocompleteHtml(predictions);

  showAutocompletePredictions();
  renderHtmlInContainer(autocompleteContainer, autocompleteHtml);
  activatePredictionsEventListeners(predictions);
};

export const getAutocompletePredictions = async (inputData, session) => {
  const encodedInputData = encodeURIComponent(inputData);
  const apiUrl = `/api/autocomplete/${encodedInputData}&${session}`;
  const apiRes = await Ajax.get(apiUrl);
  const { status } = apiRes;
  if (status !== 200) {
    return null;
  }
  return apiRes.predictionList;
};
