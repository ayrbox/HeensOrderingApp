//@desc            return total for order item (price and additional costs)
const calculateItemTotal = orderItem => {
  const additionalCost = (orderItem.options || []).reduce(
    (total, option) => total + option.additionalCost,
    0
  );
  return Number(orderItem.price + additionalCost);
};

//@desc         return new OrderItem with calcualted total for order item
const getOrderItem = orderItem => {
  return {
    name: orderItem.name,
    price: orderItem.price,
    itemTotal: calculateItemTotal(orderItem),
    options: orderItem.options || []
  };
};

const calculateOrderTotal = orderItems => {
  return orderItems.reduce((total, item) => total + item.itemTotal, 0);
};

const addOrderItem = (order, order_item) => {
  //require order to be validated

  if (order_item) {
    const _orderItem = getOrderItem(order_item);
    order.orderItems.push(_orderItem);
  }
  order.subTotal = calculateOrderTotal(order.orderItems);

  order.orderTotal = order.subTotal - order.subTotal * (order.discount / 100);
  return order;
};

module.exports = {
  calculateItemTotal,
  getOrderItem,
  calculateOrderTotal,
  addOrderItem
};
