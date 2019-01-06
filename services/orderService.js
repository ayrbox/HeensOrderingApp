// @desc            return total for order item (price and additional costs)
const calculateItemTotal = (orderItem) => {
  const additionalCost = (orderItem.options || []).reduce(
    (total, option) => total + option.additionalCost,
    0,
  );
  return Number(orderItem.price + additionalCost);
};

// @desc         return new OrderItem with calcualted total for order item
const getOrderItem = orderItem => ({
  name: orderItem.name,
  price: orderItem.price,
  itemTotal: calculateItemTotal(orderItem),
  options: orderItem.options || [],
});

const calculateOrderTotal = (orderItems) => {
  const orderTotal = orderItems.reduce((total, item) => total + item.itemTotal, 0);
  return orderTotal;
};


const addOrderItem = (order, orderItem) => {
  // TODO: require order to be validated
  if (orderItem) {
    order.orderItems.push(
      getOrderItem(orderItem),
    );
  }

  const subTotal = calculateOrderTotal(order.orderItems);
  const orderTotal = subTotal - (subTotal * (order.discount / 100));

  return {
    ...order,
    subTotal,
    orderTotal,
  };
};

module.exports = {
  calculateItemTotal,
  getOrderItem,
  calculateOrderTotal,
  addOrderItem,
};
