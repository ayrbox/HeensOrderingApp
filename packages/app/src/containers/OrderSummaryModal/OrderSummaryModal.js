import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import pick from 'lodash/pick';
import { withRouter } from 'react-router-dom';

import ConfirmAction from '../../components/ConfirmAction';
import DeliveryAddress from './components/DeliveryAddress';
import OrderTable from './components/OrderTable';
import OrderItems from './components/OrderItems';
import OrderNote from './components/OrderNote';
import Discount from './components/Discount';
import Status from './components/Status';

const OrderSummaryModal = ({
  order,
  setTable,
  setDeliveryAddress,
  addNote,
  setDiscount,
  setStatus,
  processOrder,
  showSummary,
  history,
}) => {
  const {
    orderType,
    deliveryAddress,
    subTotal,
    discount,
    orderTotal,
    orderItems,
    tableNo,
    openSummary,
    note,
    status,
    requestInProgress,
    requestSuccess,
  } = order;

  const handleProcessOrder = () => {
    const orderToProcess = {
      ...pick(order, [
        'orderType',
        'deliveryAddress',
        'tableNo',
        'orderItems',
        'subTotal',
        'discount',
        'orderTotal',
        'status',
      ]),
      date: new Date(),
    };
    processOrder(orderToProcess);
  };

  const handleCloseSummary = (e) => {
    e.preventDefault();
    showSummary(false);
  };

  return (
    <Dialog
      open={openSummary}
      aria-labelledby="Order Summary"
      scroll="body"
      maxWidth="xl"
      onClose={handleCloseSummary}
    >
      <DialogContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <OrderItems
              orderItems={orderItems}
              subTotal={subTotal}
              discount={discount}
              total={orderTotal}
            />
          </Grid>
          <Grid item xs={6} style={{ padding: '16px' }}>
            <DeliveryAddress
              type={orderType}
              deliveryAddress={deliveryAddress}
              onChange={setDeliveryAddress}
            />
            <OrderTable
              type={orderType}
              tableNo={tableNo}
              onChange={setTable}
            />
            <OrderNote onChange={addNote} note={note} />
            <Discount onChange={setDiscount} discount={discount} />
            <Status onChange={setStatus} status={status} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {!requestInProgress && !requestSuccess && (
          <>
            <Button
              onClick={handleCloseSummary}
              size="large"
            >
              Close
            </Button>
            <ConfirmAction
              action={handleProcessOrder}
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
          </>
        )}
        {!requestInProgress && requestSuccess && (
          <>
            <Typography
              variant="body1"
              style={{ color: 'green' }}
            >
              Order saved.
            </Typography>
            <Button
              size="large"
              onClick={() => history.push('/orders')}
            >
              Go to orders
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

OrderSummaryModal.propTypes = {
  order: PropTypes.shape().isRequired,
  setTable: PropTypes.func.isRequired,
  setDeliveryAddress: PropTypes.func.isRequired,
  setDiscount: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  processOrder: PropTypes.func.isRequired,
  showSummary: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(OrderSummaryModal);
