import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';
import { saveOrder } from '../../actions/orderActions';

const mapState = state => ({
  order: state.orders.currentOrder,
  requestSuccess: state.orders.requestSuccess,
  loading: state.orders.loading,
  msg: state.orders.msg,
});

export default connect(mapState, {
  saveOrder,
})(OrderDetail);
