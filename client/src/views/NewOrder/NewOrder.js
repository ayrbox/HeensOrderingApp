import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import styles from './styles';

const NewOrder = ({
  classes,
  orderType,
  menus,
  getMenus,
}) => {
  useEffect(() => getMenus(), [])
  return (
    <div className={classes.root}>
      <main className={classes.mainContent}>
        <div style={{ padding: '10px' }}>
          <Typography variant="h1">Menus</Typography>
          {menus.map((m) => {
            const { _id: menuId } = m;
            return (
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                key={menuId}
                onClick={() => alert(JSON.stringify(m))}
              >
                {m.name}
              </button>
            );
          })}
        </div>
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
          <Typography variant="h5">Order Details</Typography>
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
