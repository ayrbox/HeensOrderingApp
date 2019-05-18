import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const DeliveryAddress = ({ type, deliveryAddress }) => {
  if (type !== 'delivery') {
    return null;
  }

  const {
    name,
    address,
    postCode,
    contactNo,
  } = deliveryAddress;

  return (
    <Fragment>
      <Typography variant="h6">Delivery Address</Typography>
      <Typography variant="body2">
        {name}
        <br />
        {address}
        <br />
        {postCode}
        <br />
        {contactNo}
      </Typography>
    </Fragment>
  );
};

DeliveryAddress.defaultProps = {
  deliveryAddress: undefined,
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    contactNo: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
};

export default DeliveryAddress;
