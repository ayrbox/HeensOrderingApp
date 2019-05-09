import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const styles = {
  footerWrapper: {
    margin: '0px 90px',
  },
};

const Footer = ({ classes }) => {
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footerWrapper}>
      <Grid
        container
        direction="row"
        justify="space-between"
      >
        <Grid item>
          <p data-testid="copyright-text">
            &copy;
            {` ${year} MIT License`}
          </p>
        </Grid>
        <Grid item>
          <p className="float-right">
            <Link data-testid="back-to-top" to="/#">Back to top</Link>
          </p>
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Footer);
