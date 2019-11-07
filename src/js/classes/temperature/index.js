export default class Temperature {
  constructor(temp, id) {
    this._main = temp.main;
    [this._weather] = temp.weather;
    this._clouds = temp.clouds.all;
    this._wind = temp.wind;
    this._date = new Date(temp.dt_txt);
    this.id = id;
  }

  _getWindDirection(deg) {
    const numSides = 8;
    const span = 360 / numSides;
    switch (Math.ceil((deg + span / 2) / span) % numSides) {
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
  }

  get date() {
    const lang = 'en-US';
    const formatDate = options => new Intl.DateTimeFormat(lang, options).format(this._date);
    return {
      month: formatDate({ month: 'short' }),
      weekday: formatDate({ weekday: 'short' }),
      day: formatDate({ day: 'numeric' }),
      time: formatDate({
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      hour: formatDate({
        hour: 'numeric',
        hour12: false
      })
    };
  }

  get temp() {
    return this._main.temp;
  }

  get pressure() {
    return this._main.pressure;
  }

  get humidity() {
    return this._main.humidity;
  }

  get code() {
    return this._weather.id;
  }

  get status() {
    return this._weather.description;
  }

  get clouds() {
    return this._clouds;
  }

  get wind() {
    return {
      speed: this._wind.speed,
      direction: this._getWindDirection(this._wind.deg)
    };
  }
}
