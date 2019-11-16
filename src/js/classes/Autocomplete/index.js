import elements from '../../app-elements';
import { SearchProcessing } from '..';

const { autocomplete: container } = elements;

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

    const renderPredictionsHtml = (/* predictions */) => {
      const separator = `
        <div class="search__autocomplete-separator" aria-disabled="true"></div>
      `;
      const predictionsHtml = predictions
        .map(({ description }) => {
          return `
            <button class="search__autocomplete-prediction">${description}</button>
          `;
        })
        .join(separator);
      container.innerHTML = predictionsHtml;
    };

    /* ___ Main script ___ */
    this.show();
    renderPredictionsHtml(container, predictions);
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
      container.removeChild(container.firstChild);
    }
  }

  static hasPredictions() {
    return !!container.firstChild;
  }
}
