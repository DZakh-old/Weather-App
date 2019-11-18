const express = require('express');
const createError = require('http-errors');

const router = express.Router();

router.get('/:input', async (req, res, next) => {
  try {
    console.log(req.params.input);
    return next(req.params.input);
  } catch (err) {
    return next(createError(err));
  }
});

module.exports = router;
