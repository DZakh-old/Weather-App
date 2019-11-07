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

  _getCardAverage(prop) {
    if (this._tempId === 0) {
      return this._tempData[0][prop];
    }
    return Math.round(this._getAverage(prop));
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

  get temp() {
    return this._getCardAverage('temp');
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
      const { code, status, iconId } = this._tempData[0].weather;
      return {
        code,
        status,
        iconId
      };
    }

    const codes = this._tempData.map(tempData => tempData.weather.code.toString().match(/\d/g));

    const getMostFrequentCode = codes => {
      let mostFrequentCode = '';

      for (let i = 0; i < 3; i++) {
        const getFollowingNumbers = () => {
          return codes
            .filter(code => (i ? code[i - 1] === mostFrequentCode.slice(i - 1) : true))
            .map(code => code[i]);
        };

        mostFrequentCode += this._getMostFrequent(getFollowingNumbers());
      }

      return +mostFrequentCode;
    };

    const cardWeatherCode = getMostFrequentCode(codes);
    const cardWeather = this._tempData.find(tempData => tempData.weather.code === cardWeatherCode);

    const { code, status, iconId } = cardWeather.weather;
    return {
      code,
      status,
      iconId
    };
  }

  get snatch() {
    return this._tempData.map(tempData => {
      return {
        time: tempData.id === 0 ? 'Now' : tempData.date.time,
        iconId: tempData.weather.icon,
        temp: tempData.temp
      };
    });
  }

  get humidity() {
    return this._getCardAverage('humidity');
  }

  get pressure() {
    return this._getCardAverage('pressure');
  }

  get clouds() {
    return this._getCardAverage('clouds');
  }

  get wind() {
    const getWindDirectionById = id => {
      switch (id) {
        case 1:
          return 'North';
        case 2:
          return 'Northeast';
        case 3:
          return 'East';
        case 4:
          return 'Southeast';
        case 5:
          return 'South';
        case 6:
          return 'Southwest';
        case 7:
          return 'West';
        case 0:
          return 'Northwest';
        default:
          throw new Error('Cannot count wind directoin');
      }
    };

    return {
      speed: this._getCardAverage('windSpeed'),
      direction: getWindDirectionById(this._getCardAverage('windDirection'))
    };
  }

  build() {
    return `
    
    `;
  }
}
