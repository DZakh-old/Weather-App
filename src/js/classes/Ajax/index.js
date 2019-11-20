export default class Ajax {
  static async get(url, headers = {}) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      const { status } = res;
      if (status === 204 || status === 429) {
        return { status };
      }
      const data = await res.json();
      return { status, ...data };
    } catch (err) {
      throw new Error(err);
    }
  }
}
