const orderRoutes = require("express").Router();
const passport = require("passport");

//@model
const Order = require("../../models/orderModel");
const {
  validateOrder,
  validateDeliveryAddress
} = require("../../validation/orderValidation");

//@route        GET api/orders/
//@desc         List of all orders
//@access       private
//@return       Order
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
    req.body.orderItems.forEach(item => {
      item.itemTotal =
        item.price +
        (item.options || []).reduce((t, o) => t + o.additionalCost, 0);
    });

    //subTotal: sub each item total
    const subTotal = req.body.orderItems.reduce(
      (total, item) => total + item.itemTotal,
      0
    );

    //orderTotal: subTotal - discountAmount
    const orderTotal = subTotal - subTotal * (req.body.discount / 100);

    const _order = new Order({
      orderItems: req.body.orderItems,
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

//@route        PUT api/orders/:id
//@desc         Update/Change order
//@access       private
//@return       Order
orderRoutes.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
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
