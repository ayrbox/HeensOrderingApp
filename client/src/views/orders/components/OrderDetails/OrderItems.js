import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const OrderItems = ({
  orderItems,
  subTotal,
  discount,
  total,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Menu</TableCell>
        <TableCell />
        <TableCell align="right">Price</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {orderItems.map(({
        _id: id,
        name,
        price,
        menuOptions,
      }) => (
        <Fragment key={`order-${id}`}>
          <TableRow key={id}>
            <TableCell colSpan={2}>{name}</TableCell>
            <TableCell align="right">{price}</TableCell>
          </TableRow>
          {menuOptions.map(({ description, additionalCost }) => (
            <TableRow key={`order-item-${id}-${description}`}>
              <TableCell />
              <TableCell>{description}</TableCell>
              <TableCell align="right">{additionalCost}</TableCell>
            </TableRow>
          ))}
        </Fragment>
      ))}
      <TableRow>
        <TableCell />
        <TableCell>Subtotal</TableCell>
        <TableCell align="right">{subTotal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell>Discount</TableCell>
        <TableCell align="right">
          {discount}
          {'%'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell>Total</TableCell>
        <TableCell align="right">{total}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

OrderItems.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    menuOptions: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      additionalCost: PropTypes.number,
    })),
  })).isRequired,
  subTotal: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default OrderItems;
