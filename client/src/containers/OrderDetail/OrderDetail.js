import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const OrderDetail = ({
  order,
}) => {
  const {
    orderType,
    orderItems,
  } = order;

  return (
    <Fragment>
      <Typography variant="h6">Order Details</Typography>
      <Divider />
      <Typography varaint="h1">
        {orderType}
      </Typography>

      <table>
        {orderItems.map(({ description, itemTotal }) => (
          <tr>
            <td>
              <Typography variant="body1">
                {description}
              </Typography>
            </td>
            <td>
              &pound;
              {itemTotal.toFixed(2)}
            </td>
          </tr>
        ))}
      </table>

      <pre style={{ fontSize: '0.5rem' }}>
        {JSON.stringify(order, null, 2)}
      </pre>
    </Fragment>
  );
};


OrderDetail.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default OrderDetail;
