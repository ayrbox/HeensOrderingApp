import React from 'react';
import PropTypes from 'prop-types';
import AccessItemIcon from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = theme => ({
  timeGrid: {
    paddingRight: `${theme.spacing.unit}px`,
  },
});

const Time = ({ date, classes }) => (
  <Grid container>
    <Grid item className={classes.timeGrid}>
      <AccessItemIcon />
    </Grid>
    <Grid item>
      <Typography variant="body1">
        {moment(date).format('LT')}
      </Typography>
    </Grid>
  </Grid>
);

Time.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Time);
