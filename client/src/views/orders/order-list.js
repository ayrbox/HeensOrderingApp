import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

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
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {ORDER_TYPES[order.orderType]}
                </Typography>
                <Typography variant="h5" component="h2">
                  <MotorcycleIcon />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {ORDER_STATUSES[order.orderStatus]}
                </Typography>
                <Typography component="p">
                  &pound;
                  {order.orderTotal.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">More</Button>
              </CardActions>
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
