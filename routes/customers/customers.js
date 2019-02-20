module.exports = (Customer, validateCustomer) => {
  const getCustomers = (req, res) => {
    const errors = {};
    Customer.find().then((customers) => {
      if (customers.length <= 0) {
        errors.msg = 'No customers found.';
        res.status(404).json(errors);
      }
      res.json(customers);
    });
  };

  const getCustomer = (req, res) => {
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
  };

  const createCustomer = (req, res) => {
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
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const updateCustomer = (req, res) => {
    const { errors, isValid } = validateCustomer(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const customer = {
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      postCode: req.body.postCode,
      note: req.body.note,
    };

    Customer.findOne({ _id: req.params.id }).then((c) => {
      if (!c) {
        req.status(404).json({ msg: 'Customer not found' });
      }

      Customer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: customer },
        { new: true },
      ).then(updated => res.json(updated));
    });
  };

  const deleteCustomer = (req, res) => {
    Customer.findOne({ _id: req.params.id })
      .then((c) => {
        if (!c) {
          req.status(404).json({ msg: 'Customer not found' });
        }

        Customer.findOneAndRemove({ _id: req.params.id })
          .then(() => {
            res.json({ msg: 'Customer Removed' });
          })
          .catch(() => {
            res.status(500).json({ msg: 'Unable to delete customer' });
          });
      })
      .catch(e => res.status(500).json({ msg: 'Unexpected error', excpetion: e }));
  };

  return {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
