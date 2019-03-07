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
    // validate orderItems
    const { errors, isValid } = validateOrder(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    // validate delivery
    const {
      orderType,
      deliveryAddress,
      note,
      orderStatus,
      discount,
      tableNo,
    } = req.body;

    if (orderType === 'delivery') {
      const { validationErrors, isValidDeliveryAddress } = validateDeliveryAddress(deliveryAddress);
      if (!isValidDeliveryAddress) {
        res.status(400);
        res.json(validationErrors);
        return {};
      }
    }

    // Item total of each item
    const orderItems = req.body.orderItems.map(item => orderService.getOrderItem(item));

    // subTotal: sub each item total
    const subTotal = orderService.calculateOrderTotal(req.body.orderItems);

    // orderTotal: subTotal - discountAmount
    const orderTotal = subTotal - subTotal * (discount / 100);

    new Order({
      orderItems,
      orderType,
      deliveryAddress,
      note,
      orderStatus,
      subTotal,
      discount,
      orderTotal,
      tableNo,
    }).save()
      .then(o => res.json(o))
      .catch(err => res.status(500).json({
        msg: 'Unable to save order',
        exception: err,
      }));
    return res.status(200);
  };

  const updateOrder = (req, res) => {
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
      res.status(400).json(errors);
    }

    Order.findOne({ _id: req.params.id }).then((order) => {
      if (!order) {
        res.status(404).json({ msg: 'Order not found' });
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

  const addOrderItem = (req, res) => {
    Order.findOne({ _id: req.params.id }).then((order) => {
      if (!order) {
        res.status(404).json({ msg: 'Order not found' });
      }

      const index = order.orderItems
        .map(item => item.id)
        .indexOf(req.params.itemId);

      if (index < 0) {
        return res.status(404).json({ msg: 'Order Item not found' });
      }

      order.orderItems.splice(index, 1);

      orderService
        .addOrderItem(order, undefined)
        .save()
        .then(o => res.json(o))
        .catch((err) => {
          res
            .status(500)
            .json({ msg: 'Unable to save order item', exception: err });
        });

      return res.status(200);
    });
  };

  const deleteOrderItem = (req, res) => {
    Order.findOne({ _id: req.params.id }).then((o) => {
      if (!o) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      Order.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.json({ msg: 'Order removed' });
      });
      return res.status(200);
    });
  };

  return {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    addOrderItem,
    deleteOrderItem,
  };
};
