const formatDate = (date, options, lang) => new Intl.DateTimeFormat(lang, options).format(date);

const getFormattedDate = (date, options) => {
  const lang = 'en-US';
  return formatDate(date, options, lang);
};

const isCurTime = date => date <= new Date();

const getDateObj = dateInTextFormat => {
  const date = new Date(dateInTextFormat);
  return {
    month: getFormattedDate(date, { month: 'short' }),
    weekday: getFormattedDate(date, { weekday: 'short' }),
    day: getFormattedDate(date, { day: 'numeric' }),
    time: isCurTime(date)
      ? 'now'
      : getFormattedDate(date, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
    hour: getFormattedDate(date, {
      hour: 'numeric',
      hour12: false
    })
  };
};

const getWeatherObj = weather => {
  const { id, description, icon } = weather;
  return {
    code: id,
    status: description,
    iconId: icon.slice(0, 2)
  };
};

const getWindDirectionId = windDeg => {
  const numSides = 8;
  const span = 360 / numSides;

  return Math.ceil((windDeg + span / 2) / span) % numSides;
};

export const createWeatherSnatch = (weatherData, tempId) => {
  return {
    date: getDateObj(weatherData.dt_txt),
    temp: Math.round(weatherData.main.temp),
    pressure: weatherData.main.pressure,
    humidity: weatherData.main.humidity,
    weather: getWeatherObj(weatherData.weather[0]),
    clouds: weatherData.clouds.all,
    windSpeed: Math.round(weatherData.wind.speed),
    windDirectionId: getWindDirectionId(weatherData.wind.deg),
    id: tempId
  };
};
