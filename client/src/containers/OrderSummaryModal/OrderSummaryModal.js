import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const OrderSummaryModal = ({
  order,
}) => {
  const { openSummary } = order;
  return (
    <Dialog
      open={openSummary}
      aria-labelledby="Order Summary"
      scroll="body"
    >
      <DialogContent>
        <Typography>Hello</Typography>
        <pre>
          {JSON.stringify(order, null, 2)}
        </pre>
      </DialogContent>
      <DialogActions>
        <Typography>Buttons</Typography>
      </DialogActions>
    </Dialog>
  );
};

OrderSummaryModal.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default OrderSummaryModal;
