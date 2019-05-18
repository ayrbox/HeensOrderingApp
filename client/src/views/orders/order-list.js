import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';


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
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar aria-label="order-type" className={classes.avatar}>
                      <LocalDiningIcon />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.heading}>
                      {ORDER_TYPES[order.orderType]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.heading} variant="h1">
                      &pound;
                      {order.orderTotal}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip
                      color="primary"
                      label={ORDER_STATUSES[order.orderStatus]}
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <pre>
                  {JSON.stringify(order, null, 2)}
                </pre>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                  Save
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
