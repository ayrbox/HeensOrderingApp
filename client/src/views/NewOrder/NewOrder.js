import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import Categories from './components/Categories';
import Menus from './components/Menus';
import styles from './styles';

const NewOrder = ({
  classes,
}) => (
  <div className={classes.root}>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.categoryContainer}>
        <Categories />
      </div>
    </Drawer>
    <main className={classes.mainContent}>
      <Menus />
    </main>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.orderBar}>
        <Typography variant="h6">Order Details</Typography>
      </div>
    </Drawer>
  </div>
);

NewOrder.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(NewOrder);
