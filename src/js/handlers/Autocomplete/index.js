import { submitCitySearch } from '../searchProcessing';

import { elements } from '../../utils/app-elements';

import { Ajax } from '../../helpers/Ajax';
import { renderHtmlInContainer } from '../../helpers/renderHelpers';

const { autocompleteContainer } = elements;

const hideAutocomplete = () => {
  autocompleteContainer.classList.remove('active-autocomplete');
};

const showAutocomplete = () => {
  autocompleteContainer.classList.add('active-autocomplete');
};

const removePrediction = () => {
  autocompleteContainer.removeChild(autocompleteContainer.firstChild);
};

const hasAutocompletePredictions = () => {
  return !!autocompleteContainer.firstChild;
};

const cleanAutocomplete = () => {
  hideAutocomplete();
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
      hideAutocomplete();
    });
    predictionElem.addEventListener('focus', () => {
      showAutocomplete();
    });
    predictionElem.addEventListener('click', () => {
      submitCitySearch(predictions[i]);
      cleanAutocomplete();
    });
  });
};

export const renderPredictions = predictions => {
  const autocompleteHtml = buildAutocompleteHtml(predictions);

  showAutocomplete();
  renderHtmlInContainer(autocompleteContainer, autocompleteHtml);
  activatePredictionsEventListeners(predictions);
};

export const getPredictions = async (inputData, session) => {
  const encodedInputData = encodeURIComponent(inputData);
  const apiUrl = `/api/autocomplete/${encodedInputData}&${session}`;
  const apiRes = await Ajax.get(apiUrl);
  const { status } = apiRes;
  if (status !== 200) {
    return undefined;
  }
  return apiRes.predictionList;
};
