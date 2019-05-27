import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MainLayout from '../viewcomponents/MainLayout';
import styles from './styles';

const NewOrder = ({
  classes,
  orderType,
}) => {
  console.log('Test');
  return (
    <MainLayout>
      <div className={classes.contentWrapper}>
        <Typography variant="h1">{orderType}</Typography>
      </div>
    </MainLayout>
  );
};

NewOrder.propTypes = {
  classes: PropTypes.shape().isRequired,
  orderType: PropTypes.string.isRequired,
};


export default withStyles(styles)(NewOrder);
