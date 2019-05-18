import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { ORDER_STATUSES } from '../../../../constants';

import OrderIcon from './OrderIcon';
import Time from '../../../../components/Time';

import styles from './styles';

const OrderSummary = ({ classes, order }) => {
  const {
    date,
    orderTotal,
    orderType,
    status,
  } = order;
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <OrderIcon type={orderType} />
      </Grid>
      <Grid item>
        <Time date={date} />
      </Grid>
      <Grid item>
        <Typography className={classes.heading} variant="h6">
          &pound;
          {orderTotal}
        </Typography>
      </Grid>
      <Grid item>
        <Chip
          color="primary"
          label={ORDER_STATUSES[status]}
        />
      </Grid>
    </Grid>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(OrderSummary);
