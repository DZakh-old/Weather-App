export default class Autocomplete {
  static renderPredictions(predictions) {
    const container = document.getElementById('autocomplete');

    container.classList.toggle('active-autocomplete');
  }
}
