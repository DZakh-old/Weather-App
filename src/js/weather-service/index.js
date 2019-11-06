import Ajax from '../ajax';

export default class WeatherService {
  get fetchedData() {
    const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${this.city}&units=metric&lang=ru`;
    const apiHeaders = {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
    };
    return Ajax.get(apiUrl, apiHeaders);
  }

  get parsedData() {
    return this.fetchedData.then(({ city, list: tempList }) => {
      console.log(city, tempList);
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
        <p>${curTemp.main.temp} deg now </p>
      `;
    });
  }
}
