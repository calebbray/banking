const express = require('express');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const customers = require('./routes/customers');

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

app.listen(config.PORT, () => {
  mongoose
    .connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
  console.log(`server runing on port ${config.PORT}`);
});
