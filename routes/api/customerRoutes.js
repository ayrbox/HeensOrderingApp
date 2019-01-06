const express = require('express');

const customerRoutes = express.Router();
const passport = require('passport');

// @model
const Customer = require('../../models/customerModel');
const { validateCustomer } = require('../../validation/customerValidation');

// @route        GET api/cutsomers
// @desc         Get all customers
// @access       private
// @return       Customer
customerRoutes.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Customer.find().then((customers) => {
      if (customers.length <= 0) {
        errors.msg = 'No customers found.';
        res.status(404).json(errors);
      }
      res.json(customers);
    });
  },
);

// @route        GET api/customers/:id
// @desc         Get customer with an Id
// @access       private
// @return       Customer
customerRoutes.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.findOne({ _id: req.params.id })
      .then((c) => {
        if (!c) {
          res.status(404).json({ msg: 'Customer not found' });
        }
        res.json(c);
      })
      .catch(() => {
        res.status(500).json({ msg: 'Unable to get customer' });
      });
  },
);

// @route        POST api/customer/
// @access       private
// @desc         Create/Add new customer
// @return       Customer
customerRoutes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCustomer(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const customer = new Customer({
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      postCode: req.body.postCode,
      note: req.body.note,
    });

    customer
      .save()
      .then(c => res.json(c))
      .catch(err => console.log(err));
  },
);

// @route        PUT api/customers/:id
// @desc         Update all customer
// @access       private
// @return       Customer
customerRoutes.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCustomer(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const _customer = {
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      postCode: req.body.postCode,
      note: req.body.note,
    };

    Customer.findOne({ _id: req.params.id }).then((c) => {
      if (!c) {
        return req.status(404).json({ msg: 'Customer not found' });
      }

      Customer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: _customer },
        { new: true },
      ).then(updated => res.json(updated));
    });
  },
);

// @route        DELETE api/customers/:id
// @desc         Delete customer
// @access       private
// @return       Message object {msg: string}
customerRoutes.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.findOne({ _id: req.params.id })
      .then((c) => {
        if (!c) {
          return req.status(404).json({ msg: 'Customer not found' });
        }

        Customer.findOneAndRemove({ _id: req.params.id })
          .then(() => {
            res.json({ msg: 'Customer Removed' });
          })
          .catch((err) => {
            res.status(500).json({ msg: 'Unable to delete customer' });
          });
      })
      .catch(e => res.status(500).json({ msg: 'Unexpected error', excpetion: e }));
  },
);

module.exports = customerRoutes;
