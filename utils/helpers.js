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

helpers.generateToken = () => {
  const tokenLength = 50;
  const hashString = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const hashArray = hashString.split('');
  let token = '';
  for (var i = 0; i <= tokenLength; i++) {
    let temp = Math.floor(Math.random() * hashArray.length);
    token += hashArray[temp];
  }
  return token;
};

helpers.comparePassword = (givenPassword, foundPassword) => {
  return new Promise((resolve, reject) => {
    compare = helpers.hashPassword(givenPassword);
    if (compare === foundPassword) {
      resolve();
    } else {
      reject(new Error({ message: 'No user found with given credentials' }));
    }
  });
};

module.exports = helpers;
