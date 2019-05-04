import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import styles from './styles';

const PageHeader = ({
  title,
  subTitle,
  classes,
  onAddClicked,
}) => (
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="center"
    className={classes.header}
  >
    <Grid item>
      <Typography variant="h1">{title}</Typography>
      {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
    </Grid>
    {onAddClicked && (
      <Grid item>
        <Fab
          color="primary"
          aria-label="Add"
          size="small"
          onClick={onAddClicked}
        >
          <AddIcon />
        </Fab>
      </Grid>
    )}
  </Grid>
);

PageHeader.defaultProps = {
  subTitle: null,
  onAddClicked: undefined
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  onAddClicked: PropTypes.func,
};

export default withStyles(styles)(PageHeader);
