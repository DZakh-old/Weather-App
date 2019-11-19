export default class Ajax {
  static async get(url, headers = {}) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      const { statusCode } = res;
      if (statusCode === 204 || statusCode === 429) return { statusCode };
      return res.json();
    } catch (err) {
      throw new Error(err);
    }
  }
}
