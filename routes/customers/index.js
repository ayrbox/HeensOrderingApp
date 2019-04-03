const { Router } = require('express');

const router = Router();
const passport = require('passport');

const customerModel = require('../../models/customerModel');
const { validateCustomer } = require('../../validation/customerValidation');
const customerHandlers = require('./customers');

const handlers = customerHandlers(customerModel, validateCustomer);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  handlers.getCustomers,
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  handlers.getCustomer,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  handlers.createCustomer,
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  handlers.updateCustomer,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  handlers.deleteCustomer,
);

module.exports = router;
