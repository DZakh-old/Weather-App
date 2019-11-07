export default class WeatherCard {
  constructor(arr) {
    this.tempData = arr;
    [this.tempId] = arr.id;
  }

  get mainTemp() {
    if (this.tempId === 0) {
      return this.tempData[0].temp;
    }

    const getSum = arr => arr.reduce((a, b) => a + b);
    const getAverage = arr => getSum(arr) / arr.length;

    return getAverage(tihs.tempData.temp);
  }
}
