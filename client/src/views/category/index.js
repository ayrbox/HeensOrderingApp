import React from 'react';
import { Route } from 'react-router-dom';
import PageProvider from '../../components/PageProvider'

import Categories from './categories';

const CategoryIndex = () => (
  <PageProvider>
    <Route path="/categories" component={Categories} />
  </PageProvider>
);

export default CategoryIndex;
