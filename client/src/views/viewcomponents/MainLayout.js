import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Footer from './Footer';
import Header from '../../containers/Header';

import styles from './mainLayoutStyles';

const MainLayout = ({ children, classes }) => (
  <div className="app-container" style={{ paddingTop: '4rem' }}>
    <Header title="Heens" />
    <main className={classes.wrapper}>
      <div className={classes.container}>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MainLayout);
