import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

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
      justify="flex-start"
      alignItems="center"
      spacing={12}
    >
      <Grid item xs>
        <OrderIcon type={orderType} />
      </Grid>
      <Grid item md>
        <Time date={moment(date).toDate()} />
      </Grid>
      <Grid item md>
        <Typography className={classes.orderTotal} variant="h6">
          &pound;
          {orderTotal.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs className={classes.statusGrid}>
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
