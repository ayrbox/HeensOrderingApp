import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Footer from './Footer';
import Header from '../../containers/Header';

import styles from './mainLayoutStyles';
import OrderModal from '../../containers/OrderModal';

const MainLayout = ({ children, classes }) => (
  <Fragment>
    <Header title="Heens" />
    <main className={classes.wrapper}>
      <div className={classes.container}>
        {children}
      </div>
    </main>
    <OrderModal />
    <Footer />
  </Fragment>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MainLayout);
