export const Ajax = {
  get: async (url, headers = {}) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      const { status } = res;
      if (status !== 200) {
        return { status };
      }
      const data = await res.json();

      return { status, ...data };
    } catch (err) {
      throw new Error(err);
    }
  }
};
