export default class Temperature {
  constructor(temp, id) {
    this._main = temp.main;
    [this._weather] = temp.weather;
    this._clouds = temp.clouds.all;
    this._wind = temp.wind;
    this._date = new Date(temp.dt_txt);
    this.id = id;
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
    return Math.round(this._main.temp);
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

  get windSpeed() {
    return Math.round(this._wind.speed);
  }

  get windDirection() {
    const getWindDirectionId = deg => {
      const numSides = 8;
      const span = 360 / numSides;

      return Math.ceil((deg + span / 2) / span) % numSides;
    };

    return getWindDirectionId(this._wind.deg);
  }
}
