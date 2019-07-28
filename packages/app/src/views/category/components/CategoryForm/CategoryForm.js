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
  getCategory,
  createCategory,
  updateCategory,
} from '../../../../api/categories';

import { usePageState, ACTIONS } from '../../../../components/PageProvider';

import styles from './styles';

const initialState = {
  name: '',
  description: '',
};

const CategoryForm = ({ classes, id, reloadAction }) => {
  const [{
    open,
    requestInProgress,
    errors,
  }, dispatch] = usePageState();

  const [state, setState] = useState(initialState);
  const { name, description } = state;
  const pageTitle = (id) ? 'Edit Category' : 'Add Category';

  const handleChange = field => ({ target }) => {
    setState(prev => ({ ...prev, [field]: target.value }));
  };

  useEffect(() => {
    if (id) {
      getCategory(id).then(({ data }) => {
        setState({
          name: data.name,
          description: data.description,
        });
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
        await updateCategory(id, { name, description });
      } else {
        await createCategory({ name, description });
      }
      dispatch({
        type: ACTIONS.SAVED,
        payload: 'Category saved successfully.',
      });
      setState(initialState);
      if (reloadAction) {
        reloadAction();
      }
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.response.data,
      });
    }
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
          error={!!errors.description}
        >
          <TextField
            id="description"
            label="Description"
            fullWidth
            multiline
            rows="4"
            value={description}
            onChange={handleChange('description')}
            error={!!errors.description}
          />
          {errors.description && (
            <FormHelperText
              className="text-help"
            >
              {errors.description}
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

CategoryForm.defaultProps = {
  id: undefined,
  reloadAction: undefined,
};

CategoryForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string,
  reloadAction: PropTypes.func,
};

export default withStyles(styles)(CategoryForm);
