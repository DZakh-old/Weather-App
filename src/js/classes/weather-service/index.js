import Ajax from '../ajax';
import Temperature from '../temperature';

export default class WeatherService {
  static async cityData(cityName) {
    const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${cityName}&units=metric`;
    const apiHeaders = {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
    };
    const res = await Ajax.get(apiUrl, apiHeaders);
    console.log(res);
    const tempList = await res.list.map((temp, i) => new Temperature(temp, i));
    console.log(tempList);
    // return {
    //   city,
    //   tempList
    // };
    // TODO: Figure out what's wrong
    return tempList;
  }
}
