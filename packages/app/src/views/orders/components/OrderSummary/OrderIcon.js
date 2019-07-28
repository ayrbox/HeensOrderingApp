import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { withStyles } from '@material-ui/core/styles';

import { ORDER_TYPES } from '../../../../constants';
import styles from './styles';

const orderIcons = {
  delivery: MotorcycleIcon,
  collection: LocalMallIcon,
  table: LocalDiningIcon,
};

const OrderIcon = ({ classes, type }) => {
  const Icon = orderIcons[type];
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item>
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          style={{ marginLeft: '10px' }}
        >
          {ORDER_TYPES[type]}
        </Typography>
      </Grid>
    </Grid>
  );
};

OrderIcon.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(OrderIcon);
