export default class Ajax {
  static async get(url, headers = {}) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (err) {
      throw new Error(`Error! ${err}!`);
    }
  }
}
