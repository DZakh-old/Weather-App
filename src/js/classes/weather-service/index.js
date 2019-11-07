import Ajax from '../ajax';
import Temperature from '../temperature';

export default class WeatherService {
  static cityData(cityName) {
    const fetchCityData = city => {
      const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}&units=metric`;
      const apiHeaders = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
      };
      const res = Ajax.get(apiUrl, apiHeaders);
      console.log(res);
      return res;
    };

    return fetchCityData(cityName).then(({ city, list }) => {
      const tempList = list.map((temp, i) => new Temperature(temp, i));

      return {
        city,
        curTemp: tempList[0]
      };
    });
  }
}
