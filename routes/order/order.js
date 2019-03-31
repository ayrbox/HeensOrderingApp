module.exports = (Order, { validateOrder, validateOrderItem, validateDeliveryAddress }) => {
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

    Order.findOne({ _id: req.params.id }).then((order) => {
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      // @todo: visit eslint disable issue
      order.orderStatus = status; // eslint-disable-line
      order.save().then(o => res.json(o));
      // @todo revisit order status findoneandupdate
      return res.status(200);
    });
  };

  const deleteOrder = (req, res) => {
    // TODO: Validate order item options too
    const { errors, isValid } = validateOrderItem(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    Order.findOne({ _id: req.params.id }).then((order) => {
      if (!order) {
        res.status(404);
        res.json({ msg: 'Order not found' });
        return;
      }

      orderService
        .addOrderItem(order, {
          name: req.body.name,
          price: req.body.price,
          options: req.body.options || [],
        })
        .save()
        .then((o) => {
          res.json(o);
        });
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
