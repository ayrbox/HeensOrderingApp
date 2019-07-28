import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const OrderTable = ({ type, tableNo }) => {
  if (type !== 'table') return null;
  return (
    <Typography variant="h6">{`Table: ${tableNo}`}</Typography>
  );
};

OrderTable.defaultProps = {
  tableNo: undefined,
};

OrderTable.propTypes = {
  type: PropTypes.string.isRequired,
  tableNo: PropTypes.string,
};

export default OrderTable;
