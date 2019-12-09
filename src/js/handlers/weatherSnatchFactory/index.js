export const createWeatherSnatch = (tempData, tempId) => {
  const getDateObj = dateInTextFormat => {
    const formatDate = (date, options, lang) => new Intl.DateTimeFormat(lang, options).format(date);

    const getFormattedDate = (date, options) => {
      const lang = 'en-US';
      return formatDate(date, options, lang);
    };

    const isCurTime = date => date <= new Date();

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

  const getWindDirection = windDeg => {
    const getWindDirectionId = deg => {
      const numSides = 8;
      const span = 360 / numSides;

      return Math.ceil((deg + span / 2) / span) % numSides;
    };

    return getWindDirectionId(windDeg);
  };

  return {
    date: getDateObj(tempData.dt_txt),
    temp: Math.round(tempData.main.temp),
    pressure: tempData.main.pressure,
    humidity: tempData.main.humidity,
    weather: getWeatherObj(tempData.weather[0]),
    clouds: tempData.clouds.all,
    windSpeed: Math.round(tempData.wind.speed),
    windDirection: getWindDirection(tempData.wind.deg),
    id: tempId
  };
};
