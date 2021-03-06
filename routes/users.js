const express = require('express');
const router = express.Router();
const helpers = require('../utils/helpers');
const validators = require('../utils/validators');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config');

const User = require('../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.get('/all', async (req, res) => {
  try {
    const users = await User.find({});
    const payload = {
      data: {}
    };

    payload.data.users = users;
    res.status(200).send(payload);
  } catch (err) {
    res.send(err.message);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.params.id).then(user => {
      if (user) {
        const payload = {
          data: {
            user: {
              username: user.username,
              email: user.email,
              userSince: JSON.stringify(user.createdAt)
                .split('T')[0]
                .replace('"', '')
            }
          }
        };

        res.status(200).send(payload);
      }
    });
  }
);

router.post('/newuser', (req, res) => {
  if (!req.is('application/json')) {
    return res.send({ error: 'expecting application/json' });
  } else {
    let { username, email, password, verify } = req.body;

    const { errors, isValid } = validators.checkNewUserInputs(
      username,
      email,
      password,
      verify
    );

    if (!isValid) {
      res.status(400).send(errors);
    } else {
      User.findOne({ email })
        .then(user => {
          if (user) {
            errors.email = 'User with this email already exists';
            res.status(400).send(errors);
          } else {
            const newUser = new User({
              username,
              email,
              password: helpers.hashPassword(password)
            });

            newUser
              .save()
              .then(() => {
                const payload = {
                  user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                  }
                };

                res.send(payload);
              })
              .catch(err => res.send(err));
          }
        })
        .catch(err => console.log(err));
    }
  }
});

router.put('/:id', async (req, res) => {
  if (!req.is('application/json')) {
    return res.send({ error: 'expecting application/json' });
  } else {
    const { username, email } = req.body;
    const { errors, isValid } = validators.checkUpdatedUserInputs(
      username,
      email
    );

    if (isValid) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res
          .status(200)
          .send({ message: `Updated user with id ${req.params.id}` });
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(400).send(errors);
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'Deleted User' });
  } catch (err) {
    res.status(404).send(err);
  }
});

// Additional routes
router.post('/login', (req, res) => {
  const errors = {};

  if (!req.is('application/json')) {
    return res.send({ error: 'expecting application/json' });
  } else {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(user => {
        if (user) {
          // If there is a user hash the given password to find a match
          const hashedPass = helpers.hashPassword(password);
          if (hashedPass === user.password) {
            const payload = { id: user.id, name: username };

            jwt.sign(
              payload,
              keys.SECRET_OR_KEY,
              { expiresIn: 1800 },
              (err, token) => {
                res.send({ success: true, token: 'Bearer ' + token });
              }
            );
          } else {
            errors.login = 'Invalid username or password';
            res.status(400).send({ errors });
          }
        } else {
          errors.login = 'Invalid username or password';
          res.status(400).send({ errors });
        }
      })
      .catch(err => res.send(err));
  }
});

module.exports = router;
