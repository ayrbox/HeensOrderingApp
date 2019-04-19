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
  testState,
  classes,
}) => (
  <Fragment>
    <AppBar position="absolute" className={classes.root}>
      <Toolbar>
        <Typography variant="h5" color="inherit" noWrap onClick={() => console.log('terohead')}>
          {title}
        </Typography>
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
          component={NavLink}
          className={classes.navItem}
          color="inherit"
          to="/takeorder"
          onClick={() => console.log(testState)}
        >
          + New Order
        </Button>
      </Toolbar>
    </AppBar>
  </Fragment>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  testState: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Header);
