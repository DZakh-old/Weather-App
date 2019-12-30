const fetch = require('node-fetch');
const createError = require('http-errors');

const Ajax = {
  get: async (url, headers = {}) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (err) {
      throw createError(err);
    }
  }
};

module.exports.Ajax = Ajax;
