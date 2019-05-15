import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// @components
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
// import OrderStatusButton from '../../components/OrderStatusButton';
import PageHeader from '../../components/PageHeader';
import { ORDER_TYPES, ORDER_STATUSES } from '../../constants';

// @actions
import { usePageState, ACTIONS } from '../../components/PageProvider';
import { getOrders } from '../../api/orders';

import styles from './styles';

const OrderList = ({ classes }) => {
  const [{ loading, data }, dispatch] = usePageState();
  const handleFetch = () => {
    dispatch({
      type: ACTIONS.FETCHING,
    });

    getOrders().then(({ data: menus }) => {
      dispatch({
        type: ACTIONS.FETCHED,
        payload: menus,
      });
    });
  };
  useEffect(handleFetch, []);
  return (
    <MainLayout>
      <div className={classes.contentWrapper}>
        <PageHeader
          title="Order List"
          subTitle="List of orders"
        />
        {
          loading ? <Spinner /> : data.map(order => (
            <Card
              className={classes.card}
              elevation="4"
            >
              <CardHeader
                title={ORDER_TYPES[order.orderType]}
                avatar={(
                  <Avatar aria-label="order-type" className={classes.avatar}>
                    <LocalDiningIcon />
                  </Avatar>
                )}
                action={(
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              />
              <CardContent>
                {false && <MotorcycleIcon fontSize="large" />}
                {false && <LocalMallIcon fontSize="large" />}
                <Typography variant="h1" component="h1">
                  &pound;
                  {order.orderTotal.toFixed(2)}
                  <Chip
                    color="primary"
                    label={ORDER_STATUSES[order.orderStatus]}
                  />
                </Typography>
                <Typography variant="p">
                  {JSON.stringify(order.deliveryAddress)}
                </Typography>
                <Typography variant="p">
                  {order.tableNo}
                </Typography>
                <Typography variant="p">
                  {order.note}
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </MainLayout>
  );
};

OrderList.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(OrderList);
