const express = require('express');
const router = express.Router();
const config = require('../config');

const Customer = require('../models/Customer');

router.get('/test', (req, res) => res.json({ msg: 'Customers Works' }));

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
    console.log('200 Retrieved all customers');
  } catch (err) {
    res.send(err.message);
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
    console.log(`201 Created a new customer ${JSON.stringify(newCustomer)}`);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.is('application/json')) {
    return res.send({ error: 'Exptecting application/json data' });
  }

  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.sendStatus(200);
    await console.log(`200 Updated a customer with id ${req.params.id}`);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndRemove({ _id: req.params.id });
    res.status(204).send('{}');
    console.log(`204 deleted customer with id: ${req.params.id}`);
  } catch (err) {
    res.status(404).send({ notFoundError: err.message });
  }
});

module.exports = router;
