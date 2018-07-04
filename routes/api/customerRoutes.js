const express = require("express");
const customerRoutes = express.Router();

//@model
const Customer = require("../../models/customerModel");
const { validateCustomer } = require("../../validation/customerValidation");

//@route        POST api/customer/
//@access       Public //todo: private route
//@desc         Create/Add new customer
//@return       Customer
customerRoutes.post("/", (req, res) => {
  const { errors, isValid } = validateCustomer(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const _customer = new Customer({
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    address: req.body.address,
    postCode: req.body.postCode,
    note: req.body.note
  });

  _customer
    .save()
    .then(c => res.json(c))
    .catch(err => console.log(err));
});

//@route        POST api/users/register
//@desc         Get all customer
//@access       Public //TODO: Private route
//@return       User
customerRoutes.get("/", (req, res) => {
  const errors = {};
  Customer.find().then(customers => {
    if (customers.length <= 0) {
      errors.customers = "No customers found.";
      return res.status(404).json(errors);
    }

    res.json(customers);
  });
});

module.exports = customerRoutes;
