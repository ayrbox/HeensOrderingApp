import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import DeliveryAddress from './DeliveryAddress';
import OrderTable from './OrderTable';
import OrderItems from './OrderItems';

const OrderDetails = ({
  order,
  onTableNoChange,
  onDeliveryAddressChange,
}) => {
  const {
    orderType,
    deliveryAddress,
    subTotal,
    discount,
    orderTotal,
    orderItems,
    tableNo,
  } = order;
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={6}>
        <OrderItems
          orderItems={orderItems}
          subTotal={subTotal}
          discount={discount}
          total={orderTotal}
        />
      </Grid>
      <Grid item xs={6} style={{ padding: '16px' }}>
        <DeliveryAddress
          type={orderType}
          deliveryAddress={deliveryAddress}
          onChange={onDeliveryAddressChange}
        />
        <OrderTable
          type={orderType}
          tableNo={tableNo}
          onChange={onTableNoChange}
        />
      </Grid>
    </Grid>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    deliveryAddress: PropTypes.shape(),
  }).isRequired,
  onTableNoChange: PropTypes.func.isRequired,
  onDeliveryAddressChange: PropTypes.func.isRequired,
};

export default OrderDetails;
