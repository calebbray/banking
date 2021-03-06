const express = require('express');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const customers = require('./routes/customers');
const users = require('./routes/users');

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  res.send('hello');
});

app.get('/booty', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/customers', customers);
app.use('/api/users', users);

app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose
    .connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
  console.log(`server runing on port ${config.PORT}`);
});
