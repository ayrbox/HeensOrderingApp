import React from 'react';

import PageProvider from '../../components/PageProvider';
import CustomerList from './customer-list';

const CustomerIndex = () => (
  <PageProvider>
    <CustomerList />
  </PageProvider>
);

export default CustomerIndex;
