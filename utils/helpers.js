// Dependencies
const crypto = require('crypto');
const config = require('../config');

const helpers = {};

helpers.hashPassword = string => {
  if (typeof string == 'string' && string.length > 0) {
    const hash = crypto
      .createHmac('sha256', config.SECRET)
      .update(string)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

module.exports = helpers;
