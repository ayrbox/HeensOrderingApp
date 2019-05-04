import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { usePageState, ACTIONS } from '../../../../components/PageProvider';

import styles from './styles';

const initialState = {
  name: '',
  description: '',
};

const CategoryForm = ({
  classes,
  errors,
}) => {
  const [{ open }, dispatch] = usePageState();

  const [state, setState] = useState(initialState);
  const { name, description } = state;
  const id = 'temp';

  const pageTitle = (id) ? 'Edit Category' : 'Add Category';

  const handleChange = field => ({ target }) => setState(prev => ({ ...prev, [field]: target.value }));

  return (
    <Dialog
      open={open}
      aria-labelledby={pageTitle}
    >
      <DialogTitle id="dialog-title">{pageTitle}</DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          className={classes.formControl}
        >
          <TextField
            autoFocus
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={handleChange('name')}
          />
        </FormControl>
        <FormControl
          fullWidth
        >
          <TextField
            id="description"
            label="Description"
            fullWidth
            rows="4"
            value={description}
            onChange={handleChange('description')}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch({
            type: ACTIONS.CLOSE
          })}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={() => console.log('Submit')} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryForm.defaultProps = {
  errors: null,
};

CategoryForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  errors: PropTypes.shape(),
};

export default withStyles(styles)(CategoryForm);
