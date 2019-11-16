export default class Autocomplete {
  constructor(container = 'autocomplete') {
    this.container = document.getElementById(container);
  }

  renderPredictions(predictions) {
    this.show();
    const separator = `
      <div class="search__autocomplete-separator" aria-disabled="true"></div>
    `;
    const predictionsHtml = predictions
      .map(prediction => {
        // TODO: add data atribute with place_id
        return `
          <button class="search__autocomplete-prediction">${prediction}</button>
        `;
      })
      .join(separator);

    this.container.innerHTML = predictionsHtml;
  }

  hide() {
    this.container.classList.remove('active-autocomplete');
  }

  show() {
    this.container.classList.add('active-autocomplete');
  }

  clear() {
    this.hide();

    while (this.hasPredictions()) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  hasPredictions() {
    return !!this.container.firstChild;
  }
}
