export default class WeatherCard {
  constructor(arr) {
    this._tempData = arr;
    this._tempId = arr[0].id;
  }

  _getSum(prop) {
    return this._tempData.reduce((acc, cur) => acc + cur[prop], 0);
  }

  _getAverage(prop) {
    return this._getSum(prop) / this._tempData.length;
  }

  _getMostFrequent(arr) {
    const counterObj = {};
    arr.forEach(number => (number in counterObj ? counterObj[number]++ : (counterObj[number] = 1)));

    let mostFrequent;
    for (let key in counterObj) {
      if (counterObj[key] > (counterObj[mostFrequent] || 0)) {
        mostFrequent = key;
      }
    }

    return mostFrequent;
  }

  get mainTemp() {
    if (this._tempId === 0) {
      return Math.round(this._tempData[0].temp);
    }
    return Math.round(this._getAverage('temp'));
  }

  get day() {
    if (this._tempId === 0) {
      return 'Today';
    }
    if (this._tempId === 7) {
      return 'Tomorrow';
    }

    const { weekday, day, month } = this._tempData[0].date;

    return `${weekday}, ${day} ${month}`;
  }

  get weather() {
    if (this._tempId === 0) {
      return {
        code: this._tempData[0].code,
        status: this._tempData[0].status
      };
    }

    const codes = this._tempData.map(tempData => tempData.code.toString().match(/\d/g));

    const getMostFrequentCode = codes => {
      let mostFrequentCode = '';

      for (let i = 0; i < 3; i++) {
        const getFollowingNumbers = () =>
          codes
            .filter(code => (i ? code[i - 1] === mostFrequentCode.slice(i - 1) : true))
            .map(code => code[i]);

        mostFrequentCode += this._getMostFrequent(getFollowingNumbers());
      }

      return mostFrequentCode;
    };

    return getMostFrequentCode(codes);
    // TODO: Add status and images
  }
}
