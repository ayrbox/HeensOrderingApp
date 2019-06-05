import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const OrderDetail = ({
  order,
}) => (
  <Fragment>
    <Typography variant="h6">Order Details</Typography>
    <pre style={{ fontSize: '0.5rem' }}>
      {JSON.stringify(order, null, 2)}
    </pre>
  </Fragment>
);


OrderDetail.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default OrderDetail;
