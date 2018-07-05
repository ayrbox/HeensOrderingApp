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

module.exports = {
  calculateItemTotal,
  getOrderItem,
  calculateOrderTotal
};
