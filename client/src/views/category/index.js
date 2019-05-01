import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Categories from './categories';

const CategoryIndex = () => (
  <Fragment>
    <Route path="/categories" component={Categories} />
  </Fragment>
);

export default CategoryIndex;
