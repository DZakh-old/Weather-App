import Ajax from '../ajax';
import Temperature from '../temperature';

export default class WeatherService {
  get fetchedData() {
    const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${this.city}&units=metric`;
    const apiHeaders = {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
    };
    return Ajax.get(apiUrl, apiHeaders);
  }

  get parsedData() {
    return this.fetchedData.then(({ city, list }) => {
      const tempList = list.map((temp, i) => new Temperature(temp, i));
      return {
        city,
        curTemp: tempList[0]
      };
    });
  }

  displayWeatherInCity(cityName) {
    this.city = cityName;
    this.parsedData.then(({ city, curTemp }) => {
      document.getElementById('app').innerHTML += `
        <h2>In ${city.name}</h2>
        <p>${curTemp.temp} deg now </p>
        <p>${curTemp.date.time} time of test </p>
        <p>${curTemp.date.day} date of test </p>
        <p>${curTemp.date.weekday} day of test </p>
        <p>${curTemp.date.month} month of test </p>
        <p>${curTemp.pressure} presure </p>
        <p>${curTemp.humidity} humidity </p>
        <p>${curTemp.status} status </p>
        <p>${curTemp.clouds} clouds </p>
        <p>${curTemp.wind.direction} wind direction </p>
        <p>${curTemp.wind.speed} wind speed </p>        
        `;
    });
  }
}
