import {
  isString,
  isEmpty,
  pick,
} from 'lodash';

const defaultOrder = {
  date: new Date(),
  orderType: 'table',
  orderItems: [],
  subTotal: 0,
  discount: 0,
  orderTotal: 0,
  status: 'ordered',
};

export const formatOrder = (order) => {
  const {
    orderType,
  } = order;

  if (!isString(orderType) || isEmpty(orderType)) throw TypeError('Invalid `ordertype`. ');

  return {
    ...defaultOrder,
    ...pick(order, [
      'orderType',
      'deliveryAddress',
      'tableNo',
      'orderItems',
      'subTotal',
      'discount',
      'orderTotal',
    ]),
  };
};

export const calculateTotal = (order) => {
  const {
    orderItems,
    discount = 0,
  } = order;
  const subTotal = orderItems.reduce((total, { itemTotal }) => total + itemTotal, 0);

  return {
    subTotal,
    discount,
    orderTotal: subTotal - discount,
  };
};

export default formatOrder;
