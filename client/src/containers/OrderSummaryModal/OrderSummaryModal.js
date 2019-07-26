import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import OrderDetails from './components/OrderDetails';
import ConfirmAction from '../../components/ConfirmAction';

const OrderSummaryModal = ({
  order,
  setTable,
  setDeliveryAddress,
  processOrder,
}) => {
  const { openSummary } = order;
  return (
    <Dialog
      open={openSummary}
      aria-labelledby="Order Summary"
      scroll="body"
      maxWidth="xl"
    >
      <DialogContent>
        <OrderDetails
          order={order}
          onTableNoChange={setTable}
          onDeliveryAddressChange={setDeliveryAddress}
        />
      </DialogContent>
      <DialogActions>
        <ConfirmAction
          action={processOrder}
          message="Please click yes to confirm and process order?"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Confirm Order
          </Button>
        </ConfirmAction>
      </DialogActions>
    </Dialog>
  );
};

OrderSummaryModal.propTypes = {
  order: PropTypes.shape().isRequired,
  setTable: PropTypes.func.isRequired,
  setDeliveryAddress: PropTypes.func.isRequired,
  processOrder: PropTypes.func.isRequired,
};

export default OrderSummaryModal;
