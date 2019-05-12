import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from '../../../api/customers';


import { usePageState, ACTIONS } from '../../../components/PageProvider';
import styles from './styles';

const initialState = {
  name: '',
  phoneNo: '',
  address: '',
  postCode: '',
};

const CustomerForm = ({
  classes,
  id,
  reloadAction,
}) => {
  const [{
    open,
    requestInProgress,
    errors,
  }, dispatch] = usePageState();

  const [state, setState] = useState(initialState);
  const {
    name,
    phoneNo,
    address,
    postCode,
  } = state;
  const pageTitle = (id) ? 'Edit Customer' : 'Add Customer';

  useEffect(() => {
    if (id) {
      getCustomer(id).then(({ data }) => {
        setState({ ...data });
      });
    } else {
      setState(initialState);
    }
  }, [id]);


  const handleSave = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SAVING });
    try {
      if (id) {
        await updateCustomer(id, {
          name,
          phoneNo,
          address,
          postCode,
        });
      } else {
        await createCustomer({
          name,
          phoneNo,
          address,
          postCode,
        });
      }
      dispatch({
        type: ACTIONS.SAVED,
        payload: 'Customer saved successfully.',
      });
      setState(initialState);
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.response.data,
      });
    }

    if (reloadAction) {
      reloadAction();
    }
  };

  const handleChange = field => ({ target }) => {
    setState(prev => ({ ...prev, [field]: target.value }));
  };

  return (
    <Dialog
      open={open}
      aria-labelledby={pageTitle}
    >
      <DialogTitle id="dialog-title">
        {pageTitle}
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.name}
        >
          <TextField
            autoFocus
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={handleChange('name')}
            error={!!errors.name}
          />
          {errors.name && (
            <FormHelperText
              className="text-help"
            >
              {errors.name}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.phoneNo}
        >
          <TextField
            autoFocus
            id="phoneNo"
            label="Phone Number"
            fullWidth
            value={phoneNo}
            onChange={handleChange('phoneNo')}
            error={!!errors.phoneNo}
          />
          {errors.phoneNo && (
            <FormHelperText
              className="text-help"
            >
              {errors.phoneNo}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.address}
        >
          <TextField
            autoFocus
            id="address"
            label="Address"
            fullWidth
            value={address}
            onChange={handleChange('address')}
            error={!!errors.address}
          />
          {errors.address && (
            <FormHelperText
              className="text-help"
            >
              {errors.address}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.postCode}
        >
          <TextField
            autoFocus
            id="postCode"
            label="Post Code"
            fullWidth
            value={postCode}
            onChange={handleChange('postCode')}
            error={!!errors.postCode}
          />
          {errors.postCode && (
            <FormHelperText
              className="text-help"
            >
              {errors.postCode}
            </FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch({ type: ACTIONS.CLOSE })}
          color="primary"
          disabled={requestInProgress}
        >
          Cancel
        </Button>
        {requestInProgress && <CircularProgress size={16} />}
        <Button
          type="submit"
          onClick={handleSave}
          color="primary"
          disabled={requestInProgress}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomerForm.defaultProps = {
  id: null,
  reloadAction: undefined,
};

CustomerForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string,
  reloadAction: PropTypes.func,
};


export default withStyles(styles)(CustomerForm);
