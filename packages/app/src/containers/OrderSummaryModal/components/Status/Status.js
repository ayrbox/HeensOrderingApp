import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ORDER_STATUSES } from '../../../../constants';


const Status = ({
  status,
  onChange,
}) => {
  const handleStatusChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    onChange(value);
  };

  return (
    <FormControl
      fullWidth
    >
      <InputLabel htmlFor="status-dropdown">Status: </InputLabel>
      <Select
        value={status}
        onChange={handleStatusChange}
        inputProps={{
          name: 'status',
          id: 'status-dropdown',
          'data-testid': 'status-dropdown',
        }}
      >
        {Object.entries(ORDER_STATUSES).map(([key, value]) => (
          <MenuItem
            key={key}
            value={key}
            data-testid="status-dropdown-item"
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Status;
