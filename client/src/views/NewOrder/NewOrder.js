import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Header from '../../containers/Header';
import OrderCategories from '../../containers/OrderCategories';
import OrderMenus from '../../containers/OrderMenus';
import MenuModal from '../../containers/MenuModal';
import OrderDetail from '../../containers/OrderDetail';
import styles from './styles';


const NewOrder = ({
  classes,
}) => (
  <>
    <Header title="New Order" />
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className={classes.categoryContainer}>
          <OrderCategories />
        </div>
      </Drawer>
      <main className={classes.mainContent}>
        <div className={classes.toolbar} />
        <OrderMenus />
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <div className={classes.orderBar}>
          <OrderDetail />
        </div>
      </Drawer>
      <MenuModal />
    </div>
  </>
);

NewOrder.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(NewOrder);
