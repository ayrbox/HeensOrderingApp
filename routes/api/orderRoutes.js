const orderRoutes = require("express").Router();
const passport = require("passport");

//@model
const Order = require("../../models/orderModel");
const {
  validateOrder,
  validateOrderItem,
  validateDeliveryAddress
} = require("../../validation/orderValidation");

//@services
const orderService = require("../../services/orderService");

//@route        GET api/orders/
//@desc         List of all orders
//@access       private
//@return       [Order]
orderRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find().then(orders => {
      if (orders.length === 0) {
        return res.status(404).json({ msg: "No orders were found" });
      }
      res.json(orders);
    });
  }
);

//@route        GET api/orders/:id
//@desc         List of all orders
//@access       private
//@return       Order
orderRoutes.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.findOne({ _id: req.params.id }).then(o => {
      if (!o) {
        res.status(404).json({ msg: "Order not found" });
      }

      res.json(o);
    });
  }
);

//@route        POST api/orders/
//@desc         Create new order
//@access       private
//@return       Order
orderRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate orderItems
    const { errors, isValid } = validateOrder(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //validate delivery
    if (req.body.orderType === "delivery") {
      const { errors, isValid } = validateDeliveryAddress(
        req.body.deliveryAddress
      );
      if (!isValid) {
        return res.status(400).json(errors);
      }
    }

    //Item total of each item
    const order_items = req.body.orderItems.map(item =>
      orderService.getOrderItem(item)
    );

    //subTotal: sub each item total
    const subTotal = orderService.calculateOrderTotal(req.body.orderItems);

    //orderTotal: subTotal - discountAmount
    const orderTotal = subTotal - subTotal * (req.body.discount / 100);

    const _order = new Order({
      orderItems: order_items,
      orderType: req.body.orderType,
      deliveryAddress: req.body.deliveryAddress,
      note: req.body.note,
      orderStatus: req.body.orderStatus,
      subTotal: subTotal,
      discount: req.body.discount,
      orderTotal: orderTotal
    });

    _order
      .save()
      .then(o => res.json(o))
      .catch(err =>
        res.status(500).json({
          msg: "Unable to save order",
          exception: err
        })
      );
  }
);

//@route        DELETE api/orders/:id/additem
//@desc         Update/Change order
//@access       private
//@return       Order
orderRoutes.post(
  "/:id/item",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO: Validate order item options too
    const { errors, isValid } = validateOrderItem(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Order.findOne({ _id: req.params.id }).then(order => {
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      orderService
        .addOrderItem(order, {
          name: req.body.name,
          price: req.body.price,
          options: req.body.options || []
        })
        .save()
        .then(o => {
          res.json(o);
        });
    });
  }
);

//@route         DELETE api/orders/:id/removeitem/:itemId
//@desc          Delete order item
//@access        private
//@return        Order
orderRoutes.delete(
  "/:id/item/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.findOne({ _id: req.params.id }).then(order => {
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }

      const _index = order.orderItems
        .map(item => item.id)
        .indexOf(req.params.itemId);

      if (_index < 0) {
        return res.status(404).json({ msg: "Order Item not found" });
      }

      order.orderItems.splice(_index, 1);

      orderService
        .addOrderItem(order, undefined)
        .save()
        .then(o => res.json(o))
        .catch(err => {
          res
            .status(500)
            .json({ msg: "Unable to save order item", exception: err });
        });
    });
  }
);

//@route        DELETE api/orders/:id
//@desc         delete order
//@access       private
//@return       Order
orderRoutes.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.findOne({ _id: req.params.id }).then(o => {
      if (!o) {
        return req.status(404).json({ msg: "Order not found" });
      }

      Order.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.json({ msg: "Order removed" });
      });
    });
  }
);

module.exports = orderRoutes;
