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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


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
  menuOptions: [],
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
    menuOptions,
  } = state;
  const pageTitle = (id) ? 'Edit Menu' : 'Add Menu';

  const handleChange = field => ({ target }) => {
    setState(prev => ({ ...prev, [field]: target.value }));
  };

  const handleOptionChange = (field, index) => ({ target }) => {
    setState(prev => ({
      ...prev,
      menuOptions:
        menuOptions.map((_, idx) => ((idx === index) ? { ..._, [field]: target.value } : _)),
    }));
  };

  useEffect(() => {
    if (id) {
      getMenu(id).then(({ data }) => {
        const { _id: categoryId } = data.category;
        setState(prev => ({
          ...prev,
          name: data.name,
          description: data.description,
          price: data.price,
          category: categoryId,
          tags: data.tags.join(', '),
          menuOptions: data.menuOptions,
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
          menuOptions,
        });
      } else {
        await createMenu({
          name,
          description,
          price,
          category,
          tags,
          menuOptions,
        });
      }
      dispatch({
        type: ACTIONS.SAVED,
        payload: 'Menu saved successfully.',
      });
      setState(prev => ({
        ...initialState,
        categories: prev.categories,
      }));
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
      scroll="body"
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
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
          >
            <Typography variant="h5">
              Menu Options
            </Typography>
          </Grid>
          <Grid
            item
          >
            <IconButton
              color="primary"
              aria-label="Add"
              size="small"
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  menuOptions: [...menuOptions, {
                    description: '',
                    additionalCost: 0.00,
                  }],
                }));
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        {menuOptions.map((option, index) => {
          const itemKey = `options-${index}-${description}`;
          return (
            <Grid
              container
              key={itemKey}
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={24}
            >
              <Grid
                item
                xs={8}
              >
                <FormControl
                  fullWidth
                >
                  <TextField
                    value={option.description}
                    onChange={handleOptionChange('description', index)}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
              >
                <FormControl
                  fullWidth
                >
                  <TextField
                    inputProps={{
                      style: { textAlign: 'right' },
                    }}
                    value={option.additionalCost}
                    onChange={handleOptionChange('additionalCost', index)}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={1}
              >
                <IconButton
                  color="primary"
                  aria-label="Add"
                  size="small"
                  onClick={() => {
                    setState((prev) => {
                      const options = [...prev.menuOptions];
                      options.splice(index, 1);
                      return ({
                        ...prev,
                        menuOptions: [...options],
                      });
                    });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
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
