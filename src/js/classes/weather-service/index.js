import Ajax from '../ajax';
import Temperature from '../temperature';

export default class WeatherService {
  static async getWeatherDataInCity(location) {
    const apiUrl = `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${location.lat()}&lon=${location.lng()}&units=metric`;
    const apiHeaders = {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '0ac326cb26mshfed5d47e55143adp14a52bjsnc231edba1e81'
    };
    const res = await Ajax.get(apiUrl, apiHeaders);
    // console.log(JSON.stringify(res));
    const dataList = await res.list.map((temp, i) => new Temperature(temp, i));

    // return {
    //   city,
    //   dataList
    // };
    // TODO: Figure out what's wrong
    return dataList;
  }
}
