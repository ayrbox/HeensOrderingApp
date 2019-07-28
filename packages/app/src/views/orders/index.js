import React from 'react';
import PageProvider from '../../components/PageProvider';

// @views
import OrderList from './order-list';

const OrderIndex = () => (
  <PageProvider>
    <OrderList />
  </PageProvider>
);

export default OrderIndex;
