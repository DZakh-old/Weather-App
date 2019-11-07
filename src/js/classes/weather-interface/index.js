import WeatherService from '../weather-service';

export default class WeatherInterface {
  displayWeatherInCity(cityName) {
    WeatherService.cityData(cityName).then(({ city, curTemp }) => {
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
