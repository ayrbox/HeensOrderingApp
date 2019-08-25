import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import OrderSummary from './components/OrderSummary';
import OrderDetails from './components/OrderDetails';


// @components
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';

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
          loading ? <Spinner /> : data.map(({ _id: orderId, ...order }) => (
            <ExpansionPanel key={orderId}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <OrderSummary order={order} />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <OrderDetails order={order} />
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Cancel Order</Button>
                <Button size="small" color="primary">
                  Change Order State
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
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
