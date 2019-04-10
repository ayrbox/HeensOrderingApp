module.exports = (Order, { validateOrder }) => {
  const getOrders = (req, res) => Order.find().then((orders) => {
    if (orders.length === 0) {
      res.status(404);
      res.json({ msg: 'No orders were found' });
    }
    res.json(orders);
  });

  const getOrder = (req, res) => {
    const { id } = req.params;
    return Order.findOne({ _id: id }).then((o) => {
      if (!o) {
        res.status(404);
        res.json({ msg: 'Order not found' });
      }

      res.json(o);
    });
  };

  const createOrder = (req, res) => {
    // TODO: calculate itemTotal
    // TODO: calculate subTotal
    // TODO: calculate orderTotal
    const { errors, isValid } = validateOrder(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    // Item total of each item
    // const orderItems = req.body.orderItems.map(item => orderService.getOrderItem(item));

    // subTotal: sub each item total
    // const subTotal = orderService.calculateOrderTotal(req.body.orderItems);

    // orderTotal: subTotal - discountAmount
    // const orderTotal = subTotal - subTotal * (discount / 100);

    return new Order(req.body).save()
      .then(o => res.json(o))
      .catch((err) => {
        res.status(500);
        res.json(err);
      });
  };

  const updateOrderStatus = (req, res) => {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      res.json({ msg: 'Invalid stauts' });
      return {};
    }

    return Order.findOne({ _id: req.params.id }).then((order) => {
      if (!order) {
        res.status(404);
        res.json({ msg: 'Order not found' });
        return {};
      }

      // @todo: visit eslint disable issue
      order.status = status; // eslint-disable-line
      return order.save().then(o => res.json(o));
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
  };

  const deleteOrder = (req, res) => {
    const { id } = req.params;
    return Order.findOne({ _id: id }).then((order) => {
      if (!order) {
        res.status(404);
        res.json({ msg: 'Order not found' });
        return;
      }

      Order.findOneAndRemove({ _id: id }).then(() => {
        res.json({ msg: 'Order deleted' });
      }).catch((err) => {
        res.status(500);
        res.json(err);
      });
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
  };

  return {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
};
