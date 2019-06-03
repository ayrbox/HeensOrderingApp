import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import MenuItem from '@material-ui/core/MenuItem';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';


const MenuModal = ({
  menu,
  open,
  resetMenu,
}) => (
  <Dialog
    open={open}
    aria-labelledby="Order Menu Modal"
    scroll="body"
  >
    <DialogTitle id="dialog-title">Menu</DialogTitle>
    <DialogContent>
      <pre>
        {JSON.stringify(menu, null, 2)}
      </pre>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => resetMenu()}
        color="primary"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        color="primary"
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

MenuModal.propTypes = {
  menu: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  resetMenu: PropTypes.func.isRequired,
};

export default withStyles({})(MenuModal);
