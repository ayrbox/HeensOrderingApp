import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const NewOrder = ({
  classes,
  orderType,
  menus,
  getMenus,
}) => {
  useEffect(() => getMenus(), [])
  return (
    <Grid
      container
      direction="row"
      justify="center"
      spacing={0}
    >
      <Grid item xs={8}>
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
      </Grid>
      <Grid item xs={4}>
        <div
          style={{
            background: 'red',
            height: '100vh',
          }}
        >
          {orderType}
          Test
        </div>
      </Grid>
    </Grid>
  );
};

NewOrder.propTypes = {
  classes: PropTypes.shape().isRequired,
  orderType: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(NewOrder);
