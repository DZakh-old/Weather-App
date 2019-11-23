import elements from '../../app-elements';
import SearchProcessing from '../SearchProcessing';
import Ajax from '../Ajax';

const { autocomplete: container } = elements;

const buildAutocomplete = predictions => {
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

export default class Autocomplete {
  static renderPredictions(predictions) {
    const activatePredictionsEventListeners = () => {
      const predictionElements = [...document.querySelectorAll('.search__autocomplete-prediction')];
      predictionElements.forEach((prediction, i) => {
        prediction.addEventListener('blur', () => {
          this.hide();
        });
        prediction.addEventListener('focus', () => {
          this.show();
        });
        prediction.addEventListener('click', () => {
          SearchProcessing.submit(predictions[i]);
          Autocomplete.clear();
        });
      });
    };

    /* ___ Main script ___ */
    this.show();
    const autocompleteHtml = buildAutocomplete(predictions);
    this.renderAutocomplete(autocompleteHtml);
    activatePredictionsEventListeners();
  }

  static hide() {
    container.classList.remove('active-autocomplete');
  }

  static show() {
    container.classList.add('active-autocomplete');
  }

  static clear() {
    this.hide();
    while (this.hasPredictions()) {
      this.removePrediction();
    }
  }

  static hasPredictions() {
    return !!container.firstChild;
  }

  static removePrediction() {
    container.removeChild(container.firstChild);
  }

  static renderAutocomplete(html) {
    container.innerHTML = html;
  }

  static async getPredictions(inputData, session) {
    try {
      const encodedInputData = encodeURIComponent(inputData);
      const apiUrl = `/api/autocomplete/${encodedInputData}&${session}`;
      const apiRes = await Ajax.get(apiUrl);
      const { status } = apiRes;
      if (status !== 200) {
        return undefined;
      }
      return apiRes.predictionList;
    } catch (err) {
      throw new Error(err);
    }
  }
}
