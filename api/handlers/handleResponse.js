const createError = require('http-errors');

const handleResponse = (apiResponse, res, next) => {
  try {
    const { statusCode } = apiResponse;
    switch (statusCode) {
      case 200:
        return res.status(200).json(apiResponse);
      case 204:
      case 406:
      case 429:
        return res.status(statusCode).end();
      default:
        return next(createError(statusCode, apiResponse));
    }
  } catch (err) {
    return next(createError(err));
  }
};

module.exports.handleResponse = handleResponse;
