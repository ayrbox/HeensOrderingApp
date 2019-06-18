import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { ORDER_TYPES } from '../../constants';
import styles from './styles';


const subTotal = ({
  orderItems,
}) => orderItems.reduce((_, { itemTotal }) => _ + itemTotal, 0);

const OrderDetail = ({
  classes,
  order,
}) => {
  const {
    orderType,
    orderItems,
  } = order;

  return (
    <Fragment>
      <Typography
        variant="h6"
        className={classes.title}
      >
        Order Details
      </Typography>
      <Typography
        varaint="h1"
        className={classes.type}
      >
        {ORDER_TYPES[orderType]}
      </Typography>
      <Divider className={classes.spacer} />
      <List className={classes.items}>
        {
          orderItems.map(({ name, itemTotal, menuOptions }) => (
            <Fragment>
              <ListItem
                className={classes.item}
              >
                <Typography className={classes.itemText}>
                  {name}
                </Typography>
                <Typography className={classes.itemTotal}>
                  &pound;
                  {itemTotal.toFixed(2)}
                </Typography>
              </ListItem>
              {menuOptions.map(({ description: option, additionalCost: cost }) => (
                <ListItem
                  className={classes.option}
                >
                  <Typography className={classes.optionText}>
                    {option}
                  </Typography>
                  <Typography className={classes.itemTotal}>
                    {!!cost && `£${cost.toFixed(2)}`}
                  </Typography>
                </ListItem>
              ))}
            </Fragment>
          ))
        }
        <Divider className={classes.spacer} />
        <ListItem className={classes.item}>
          <Typography className={classes.orderTotal}>
            Total:
          </Typography>
          <Typography variant="h3" className={classes.orderTotal}>
            £
            {subTotal(order).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Button variant="contained" color="primary">
        Process Order
      </Button>
    </Fragment>
  );
};


OrderDetail.propTypes = {
  classes: PropTypes.shape().isRequired,
  order: PropTypes.shape().isRequired, // TODO: list out all properties
};

export default withStyles(styles)(OrderDetail);
