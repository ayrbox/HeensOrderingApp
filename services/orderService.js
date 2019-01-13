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
  const orderTotal = orderItems.reduce((total, item) => total + (item.itemTotal || 0), 0);
  return orderTotal;
};


const addOrderItem = (order, orderItem) => {
  if (!order) {
    throw Error('Order is not defined');
  }

  if (!orderItem) {
    throw Error('Order Item is required');
  }

  const { name, price, options = [] } = orderItem;
  const orderItems = (order.orderItems || []);
  orderItems.push({
    name,
    price,
    itemTotal: calculateItemTotal(orderItem),
    options,
  });

  const subTotal = calculateOrderTotal(order.orderItems);
  const orderTotal = subTotal - (subTotal * (order.discount / 100));

  return {
    ...order,
    orderItems,
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
