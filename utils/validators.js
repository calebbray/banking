/*
 * Validators 
 * 
 * 
 */

const validators = {};

validators.checkNewUserInputs = (username, email, password, verify) => {
  const errors = {};
  username =
    typeof username == 'string' && username.trim().length >= 6
      ? username.trim()
      : (errors.username = 'Username should be greater than 6 characters long');

  email =
    typeof email == 'string' &&
    email.trim().length > 4 &&
    email.indexOf('@') > -1
      ? email.trim()
      : (errors.email = 'Please enter a valid email');

  password =
    typeof password == 'string' && password.trim().length >= 7
      ? password.trim()
      : (errors.password = 'Password should be at least 7 characters long');

  verify =
    password === verify ? true : (errors.verify = 'Passwords should match');

  return {
    errors,
    isValid: Object.keys(errors).length == 0
  };
};

validators.checkUpdatedUserInputs = (username, email) => {
  const errors = {};

  username =
    typeof username == 'string' && username.trim().length > 0 ? true : false;
  email =
    typeof email == 'string' &&
    email.trim().length > 0 &&
    email.indexOf('@') > -1
      ? true
      : false;

  if (username == false && email == false) {
    errors.invalidUpdate = 'You must update either your username or password';
    return {
      errors,
      isValid: false
    };
  } else {
    return {
      errors,
      isValid: true
    };
  }
};

module.exports = validators;
