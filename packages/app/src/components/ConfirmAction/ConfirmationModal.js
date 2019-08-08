import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const ConfirmationModal = ({
  open,
  text,
  action,
  onCancel,
}) => (
  <Dialog
    open={open}
    aria-labelledby={text}
    data-testid="confirm-modal"
  >
    <DialogContent>
      <Typography variant="body1" data-testid="message-label">
        {text}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCancel}
        data-testid="no-button"
      >
         No
      </Button>
      <Button
        onClick={action}
        data-testid="yes-button"
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
