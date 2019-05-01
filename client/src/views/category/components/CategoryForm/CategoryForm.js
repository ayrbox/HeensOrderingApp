import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import styles from './styles';

class CategoryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      description: '',
    };
  }

  handleChange = name => (e) => {
    e.preventDefault();
    this.setState({
      [name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { name, description } = this.state;
    onSubmit({ name, description });
  }

  render() {
    const {
      classes,
      onClose,
      open,
      errors,
    } = this.props;
    const { name, description } = this.state;

    return (
      <Dialog
        open={open}
        aria-labelledby="Add Category"
      >
        <DialogTitle id="dialog-title">Menu Category</DialogTitle>
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
              onChange={this.handleChange('name')}
            />
          </FormControl>
          <FormControl
            fullWidth
          >
            <TextField
              id="description"
              label="Description"
              fullWidth
              multiline
              rows="4"
              value={description}
              onChange={this.handleChange('description')}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CategoryForm.defaultProps = {
  open: true,
  errors: null,
};

CategoryForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  errors: PropTypes.shape(),
};

export default withStyles(styles)(CategoryForm);
