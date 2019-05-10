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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import {
  getMenu,
  createMenu,
  updateMenu,
} from '../../../api/menus';
import { getCategories } from '../../../api/categories';

import { usePageState, ACTIONS } from '../../../components/PageProvider';

import styles from './styles';

const initialState = {
  name: '',
  description: '',
  price: '',
  category: '',
  tags: '',
  categories: [],
};

const MenuForm = ({ classes, id, reloadAction }) => {
  const [{
    open,
    requestInProgress,
    errors,
  }, dispatch] = usePageState();

  const [state, setState] = useState(initialState);
  const {
    name,
    description,
    price,
    category,
    tags,
    categories,
  } = state;
  const pageTitle = (id) ? 'Edit Menu' : 'Add Menu';

  const handleChange = field => ({ target }) => {
    setState(prev => ({ ...prev, [field]: target.value }));
  };

  useEffect(() => {
    if (id) {
      getMenu(id).then(({ data }) => {
        setState(prev => ({
          ...prev,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          tags: data.tags,
        }));
      });
    } else {
      setState(prev => ({
        ...initialState,
        categories: prev.categories, // replace everything expect categories
      }));
    }
  }, [id]);

  // categories side effects
  useEffect(() => {
    getCategories().then(({ data: list }) => {
      setState(prev => ({
        ...prev,
        categories: list,
      }));
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SAVING });
    try {
      if (id) {
        await updateMenu(id, {
          name,
          description,
          price,
          category,
          tags,
        });
      } else {
        await createMenu({
          name,
          description,
          price,
          category,
          tags,
        });
      }
      dispatch({
        type: ACTIONS.SAVED,
        payload: 'Menu saved successfully.',
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
          className={classes.formControl}
        >
          <TextField
            id="description"
            label="Description"
            fullWidth
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
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.price}
        >
          <TextField
            id="price"
            label="Price"
            fullWidth
            value={price}
            onChange={handleChange('price')}
            error={!!errors.price}
          />
          {errors.price && (
            <FormHelperText>{errors.price}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          className={classes.formControl}
          fullWidth
          error={!!errors.category}
        >
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            value={category}
            input={<Input name="category" id="category" />}
            onChange={handleChange('category')}
            error={!!errors.category}
          >
            {categories.map(({ _id: categoryId, name: categoryName }) => (
              <MenuItem
                key={`cat-${categoryId}`}
                value={categoryId}
              >
                {categoryName}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <FormHelperText>{errors.category}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={!!errors.tags}
        >
          <TextField
            id="tags"
            label="Tags"
            fullWidth
            value={tags}
            onChange={handleChange('tags')}
            error={!!errors.tags}
          />
          {errors.tags && (
            <FormHelperText>{errors.tags}</FormHelperText>
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

MenuForm.defaultProps = {
  id: undefined,
  reloadAction: undefined,
};

MenuForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string,
  reloadAction: PropTypes.func,
};

export default withStyles(styles)(MenuForm);
