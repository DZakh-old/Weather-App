export default class Ajax {
  static async get(url, headers = {}) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      const { status } = res;
      if (status === 204) return { status };
      return res.json();
    } catch (err) {
      throw new Error(err);
    }
  }
}
