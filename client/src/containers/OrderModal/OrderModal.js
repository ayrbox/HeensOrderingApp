import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const OrderModal = ({
  classes,
  isOpenOrderModal,
  closeOrderModal,
}) => {
  const [modalStep, setModalStep] = useState(0);
  return (
    <Drawer
      open={isOpenOrderModal}
      anchor="right"
      onClose={closeOrderModal}
    >
      <Grid
        container
        className={classes.modalContainer}
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          item
          className={classes.fullWidth}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
          >
            {modalStep === 1 ? (
              <IconButton
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  setModalStep(0);
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            ) : <div />}
            <IconButton
              aria-label="Close"
              onClick={closeOrderModal}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        {modalStep === 0 && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.orderButton}
              size="large"
              fullWidth
            >
              EAT IN
            </Button>
            <Button
              variant="outlined"
              color="seconday"
              className={classes.orderButton}
              size="large"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                setModalStep(1);
              }}
            >
              TAKE AWAY
            </Button>
          </Grid>
        )}
        {modalStep === 1 && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.orderButton}
              size="large"
              fullWidth
            >
              DELIVERY
            </Button>
            <Button
              variant="outlined"
              color="seconday"
              className={classes.orderButton}
              size="large"
              fullWidth
            >
              COLLECTION
            </Button>
          </Grid>
        )}
        <Grid item />
      </Grid>
    </Drawer>
  );
};

OrderModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  isOpenOrderModal: PropTypes.bool.isRequired,
  closeOrderModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderModal);
