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
  newOrder,
  showSummary,
}) => {
  const {
    orderType,
    orderItems,
  } = newOrder;

  const handleShowSummary = (e) => {
    e.preventDefault();
    showSummary();
  };

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
            {subTotal(newOrder).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowSummary}
      >
        Process Order
      </Button>
      {/*
        requestSuccess && msg
        && <Typography variant="h3" className={classes.msg}>{msg}</Typography>
      */}
      {/*
        !requestSuccess && msg
        && <Typography variant="h3" className={classes.errormsg}>{msg}</Typography>
      */}
    </Fragment>
  );
};

OrderDetail.propTypes = {
  classes: PropTypes.shape().isRequired,
  newOrder: PropTypes.shape({
    requestInProgress: PropTypes.bool,
    requestSuccess: PropTypes.bool,
    orderType: PropTypes.string,
    deliveryAddress: PropTypes.shape(),
    tableNo: PropTypes.string,
    orderItems: PropTypes.arrayOf(PropTypes.shape()),
    subTotal: PropTypes.number,
    discount: PropTypes.number,
    orderTotal: PropTypes.number,
    note: PropTypes.string,
  }).isRequired,
  showSummary: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderDetail);
