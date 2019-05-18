import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';

const OrderModal = ({ isOpenOrderModal }) => (
  <Drawer
    open={isOpenOrderModal}
    anchor="right"
  >
    <Paper style={{ padding: '20px' }}>
      <h1>Test</h1>
      <h1>Test ... Test</h1>
    </Paper>
  </Drawer>
);

OrderModal.propTypes = {
  isOpenOrderModal: PropTypes.bool.isRequired,
};

export default OrderModal;
