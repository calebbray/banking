const express = require('express');
const router = express.Router();
const config = require('../config');

const Customer = require('../models/Customer');

router.get('/test', (req, res) => res.json({ msg: 'Customers Works' }));

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (err) {
    res.send(err);
  }
});

router.post('/', async (req, res) => {
  if (!req.is('application/json')) {
    return res.send({ error: 'Exptecting application/json data' });
  }

  const { name, email, balance } = req.body;

  const customer = new Customer({
    name,
    email,
    balance
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).send(newCustomer);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = router;
