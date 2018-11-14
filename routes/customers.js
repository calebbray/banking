const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

router.get('/test', (req, res) => res.json({ msg: 'Customers Works' }));
router.get('/myamount', (req, res) => {
  Customer.find({})
    .then(customers => {
      let payload = {
        data: {}
      };
      payload.data.eligible = [];
      customers.forEach(
        customer =>
          customer.balance >= req.query.amount
            ? payload.data.eligible.push({
                name: customer.name,
                balance: customer.balance
              })
            : false
      );
      payload.data.number = payload.data.eligible.length;
      res.send(payload);
    })
    .catch(err => res.send(err.message));

  console.log('hello world');
});

router.post('/myamount', (req, res) => {
  const { amount } = req.body;
  if (!req.is('application/json')) {
    return res.send({ error: 'Exptecting application/json data' });
  } else {
    if (!amount) {
      return res.send({ error: "Expecting 'amount' in request body" });
    } else {
      Customer.find({})
        .then(customers => {
          let payload = {
            data: {}
          };
          payload.data.eligible = [];
          customers.forEach(
            customer =>
              customer.balance >= amount
                ? payload.data.eligible.push({
                    name: customer.name,
                    balance: customer.balance
                  })
                : false
          );
          payload.data.number = payload.data.eligible.length;
          res.send(payload);
        })
        .catch(err => res.send(err.message));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    const payload = {
      data: {}
    };
    payload.data.customers = customers;
    res.send(payload);
    console.log('200 Retrieved all customers');
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/:id', (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .then(customer => res.status(200).send(customer))
    .catch(error => res.status(404).send({ error: error.message }));
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

// Advanced API Calls
router.get('/none', (req, res) => {
  // try {
  //   const customers = await Customer.find({});
  //   res.send(customers);
  // } catch (err) {
  //   res.status(404).send({ err });
  // }
  res.send('hello');
  console.log('hello world');
});

module.exports = router;
