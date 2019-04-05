module.exports = (Customer, validateCustomer) => {
  const getCustomers = (req, res) => {
    const errors = {};
    return Customer.find().then((customers) => {
      if (customers.length <= 0) {
        errors.msg = 'No customers found.';
        res.status(404);
        res.json(errors);
      }
      res.json(customers);
    });
  };

  const getCustomer = (req, res) => Customer.findOne({ _id: req.params.id })
    .then((customer) => {
      if (!customer) {
        res.status(404);
        res.json({ msg: 'Customer not found' });
        return;
      }
      res.json(customer);
    })
    .catch(() => {
      res.status(500);
      res.json({ msg: 'Unable to get customer' });
    });

  const createCustomer = (req, res) => {
    const { errors, isValid } = validateCustomer(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    const customer = new Customer({
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      postCode: req.body.postCode,
      note: req.body.note,
    });

    return customer
      .save()
      .then(c => res.json(c))
      .catch((err) => {
        res.status(500);
        res.json(err);
      });
  };

  const updateCustomer = (req, res) => {
    const { errors, isValid } = validateCustomer(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    const {
      name,
      phoneNo,
      address,
      postCode,
      note,
    } = req.body;

    const customer = {
      name,
      phoneNo,
      address,
      postCode,
      note,
    };

    return Customer.findOne({ _id: req.params.id }).then((c) => {
      if (!c) {
        res.status(404);
        res.json({ msg: 'Customer not found' });
        return {};
      }

      return Customer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: customer },
        { new: true },
      ).then(updated => res.json(updated))
        .catch((err) => {
          res.status(500);
          res.json(err);
        });
    });
  };

  const deleteCustomer = (req, res) => Customer.findOne({ _id: req.params.id })
    .then((c) => {
      if (!c) {
        res.status(404);
        res.json({ msg: 'Customer not found' });
        return {};
      }

      return Customer.findOneAndRemove({ _id: req.params.id })
        .then(() => {
          res.json({ msg: 'Customer Removed' });
          return {};
        })
        .catch(() => {
          res.status(500);
          res.json({ msg: 'Unable to delete customer' });
          return {};
        });
    })
    .catch((e) => {
      res.status(500);
      res.json({ msg: 'Unexpected error', excpetion: e });
    });

  return {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
