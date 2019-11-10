// import data from '../../../data/data.json';

export default class Ajax {
  static async get(url, headers = {}) {
    try {
      // TODO: Replace in production
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      return res.json();
      // return data;
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
}
