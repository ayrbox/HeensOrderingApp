import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const ExternalLayout = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

ExternalLayout.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ExternalLayout);
