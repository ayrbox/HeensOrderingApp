export const ORDER_TYPES = {
  delivery: 'Delivery',
  collection: 'Collection',
  table: 'Table Order',
};

export const ORDER_STATUSES = {
  ordered: 'Ordered',
  paid: 'Paid', // TODO: separate out to different status
  processing: 'Processing',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  collected: 'Collected',
  served: 'Served',
};

export const DISCOUNT_PERCENTAGES = [
  0,
  5,
  10,
  15,
  20,
  25,
];


export default {
  ORDER_TYPES,
  ORDER_STATUSES,
  DISCOUNT_PERCENTAGES,
};
