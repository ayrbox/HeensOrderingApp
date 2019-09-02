import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { ORDER_TYPES } from '../../../../constants';

const DeliveryAddress = ({
  type,
  deliveryAddress,
  onChange,
}) => {
  if (type !== 'delivery') {
    return null;
  }
  const {
    name,
    address,
    postCode,
    contactNo,
  } = deliveryAddress;

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    onChange({
      ...deliveryAddress,
      [fieldName]: value,
    });
  };

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        data-testid="delivery-title"
      >
        {`${ORDER_TYPES[type]}`}
      </Typography>
      <Typography variant="h3">Delivery Address</Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            value={name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="delivery address-line1"
            value={address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="postCode"
            name="postCode"
            label="Post code"
            fullWidth
            autoComplete="delivery postal-code"
            value={postCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="contactNo"
            name="contactNo"
            label="Contact no"
            fullWidth
            autoComplete="delivery contactNo"
            value={contactNo}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

DeliveryAddress.defaultProps = {
  deliveryAddress: {},
};

DeliveryAddress.propTypes = {
  deliveryAddress: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    contactNo: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DeliveryAddress;
