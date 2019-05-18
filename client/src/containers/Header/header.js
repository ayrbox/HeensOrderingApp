import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './styles';

const Header = ({
  title,
  classes,
  openOrderModal,
}) => (
  <Fragment>
    <AppBar position="absolute" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          onClick={() => console.log('terohead')}
        >
          {title}
        </Typography>
        <div className={classes.navItemsContainer}>
          <Button
            component={NavLink}
            className={classes.navItem}
            color="inherit"
            to="/orders"
          >
            Orders
          </Button>
          <Button
            component={NavLink}
            className={classes.navItem}
            color="inherit"
            to="/customers"
          >
            Customers
          </Button>
          <Button
            component={NavLink}
            className={classes.navItem}
            color="inherit"
            to="/menus"
          >
            Menus
          </Button>
          <Button
            component={NavLink}
            className={classes.navItem}
            color="inherit"
            to="/categories"
          >
            Categories
          </Button>
          <Button
            className={classes.navItem}
            color="inherit"
            onClick={openOrderModal}
          >
            + New Order
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  </Fragment>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.shape().isRequired,
  openOrderModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
