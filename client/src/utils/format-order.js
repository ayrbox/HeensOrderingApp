import {
  isString,
  isEmpty,
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
    ...order,
  };
};

export default formatOrder;
