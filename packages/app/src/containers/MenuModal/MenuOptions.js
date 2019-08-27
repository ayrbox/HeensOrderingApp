import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  checkBox: {
    padding: 0,
  },
  optionCost: {
    width: '200px',
    textAlign: 'right',
  },
};

const MenuOptions = ({
  classes,
  options,
  onToggleSelect,
}) => (
  <List data-testid="menu-option-list">
    {options.map(({
      id,
      description,
      additionalCost,
      isChecked,
    }) => (
      <ListItem
        key={id}
        role="button"
        dense
        button
        onClick={onToggleSelect(id)}
        data-testid="menu-option-item"
      >
        <Checkbox
          tabIndex={-1}
          disableRipple
          className={classes.checkBox}
          checked={isChecked}
        />
        <ListItemText primary={description} />
        <ListItemText
          primary={additionalCost === 0 ? '' : `£${additionalCost.toFixed(2)}`}
          className={classes.optionCost}
        />
      </ListItem>
    ))}
  </List>
);

MenuOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classes: PropTypes.shape().isRequired,
  onToggleSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(MenuOptions);
