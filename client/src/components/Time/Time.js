import React from 'react';
import PropTypes from 'prop-types';
import AccessItemIcon from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const Time = ({ date }) => (
  <Grid container>
    <Grid item>
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
};

export default Time;
