import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const OrderItems = ({
  orderItems,
  subTotal,
  discount,
  total,
}) => (
  <>
    <Typography
      variant="h4"
      style={{ paddingLeft: '16px' }}
    >
      Order Items
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order Items</TableCell>
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
            <TableRow key={id} data-testid="order-item">
              <TableCell>{name}</TableCell>
              <TableCell align="right">
                &pound;
                {price.toFixed(2)}
              </TableCell>
            </TableRow>
            {menuOptions.map(({ description, additionalCost }) => (
              <TableRow key={`order-item-${id}-${description}`}>
                <TableCell style={{ paddingLeft: '50px' }}>{description}</TableCell>
                <TableCell align="right">
                  &pound;
                  {additionalCost.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </Fragment>
        ))}
        <TableRow>
          <TableCell>Subtotal</TableCell>
          <TableCell align="right" data-testid="sub-total">
            <strong>
              &pound;
              {subTotal.toFixed(2)}
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Discount</TableCell>
          <TableCell align="right" data-testid="discount">
            {discount}
            {'%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell align="right" data-testid="total">
            <strong>
              &pound;
              {total.toFixed(2)}
            </strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
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
