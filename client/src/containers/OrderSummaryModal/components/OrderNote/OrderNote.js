import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const OrderNote = ({
  note,
  onChange,
  classes,
}) => {
  const handleNoteChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    onChange(value);
  };

  return (
    <TextField
      id="note"
      label="Note"
      fullWidth
      multiline
      rows="4"
      value={note}
      onChange={handleNoteChange}
      className={classes.orderNote}
    />
  );
};

OrderNote.propTypes = {
  note: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(OrderNote);
