const fetch = require('node-fetch');
const createError = require('http-errors');

class Ajax {
  static async get(url, headers = '') {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (err) {
      return createError(err);
    }
  }
}

module.exports = Ajax;
