import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { DISCOUNT_PERCENTAGES } from '../../../../constants';

const Discount = ({
  discount,
  onChange,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    onChange(value);
  };

  return (
    <FormControl
      fullWidth
    >
      <span>15</span>
      <InputLabel htmlFor="discount-dropdown">Discount</InputLabel>
      <Select
        value={discount}
        onChange={handleChange}
        inputProps={{
          name: 'discount',
          id: 'discount-dropdown',
          'data-testid': 'discount-dropdown',
        }}
      >
        {DISCOUNT_PERCENTAGES.map(value => (
          <MenuItem
            key={`discount-item-${value}`}
            value={value}
            data-testid="discount-item"
          >
            {value}
            %
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Discount.propTypes = {
  discount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Discount;
