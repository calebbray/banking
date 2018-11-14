const Strategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('.');

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.SECRET_OR_KEY;

module.exports = passport => {
  passport.use(
    new Strategy(options, (jwt_payload, callback) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return callback(null, user);
          }
          return callback(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
