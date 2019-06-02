import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';

import Categories from './components/Categories';
import Menus from './components/Menus';
import styles from './styles';

const NewOrder = ({
  classes,
  orderType,
  menus,
  getMenus,
}) => {
  useEffect(() => getMenus(), [])

  const [categorySelected, setCategorySelected] = useState();

  return (
    <div className={classes.root}>
      <main className={classes.mainContent}>
        <Grid
          container
          direction="row"
          spacing={0}
        >
          <Grid item xs={3}>
            <Categories
              selected={categorySelected}
              onSelect={(categoryId) => {
                setCategorySelected(categoryId);
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <Menus
              category={categorySelected}
            />
          </Grid>
        </Grid>
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
};

NewOrder.propTypes = {
  classes: PropTypes.shape().isRequired,
  orderType: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(NewOrder);
