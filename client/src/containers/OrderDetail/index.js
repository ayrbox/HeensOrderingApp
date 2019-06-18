import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';
import { saveOrder } from '../../actions/orderActions';

const mapState = state => ({
  order: state.orders.currentOrder,
});

export default connect(mapState, {
  saveOrder,
})(OrderDetail);
