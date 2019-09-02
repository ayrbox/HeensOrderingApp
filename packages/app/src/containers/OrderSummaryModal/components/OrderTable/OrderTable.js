import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { ORDER_TYPES } from '../../../../constants';

const OrderTable = ({
  type,
  tableNo,
  onChange,
}) => {
  if (type !== 'table') return null;
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        data-testid="label-order-type"
      >
        {`${ORDER_TYPES[type]}`}
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tableNo"
            name="tableNo"
            label="Table No."
            fullWidth
            autoComplete="tableNo"
            value={tableNo}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            inputProps={{
              'data-testid': 'table-no-input',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

OrderTable.defaultProps = {
  tableNo: undefined,
};

OrderTable.propTypes = {
  type: PropTypes.string.isRequired,
  tableNo: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default OrderTable;
