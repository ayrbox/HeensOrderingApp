import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';
import { processOrder } from '../../actions/newOrderActions';

const mapState = state => ({
  newOrder: state.newOrder,
});

export default connect(mapState, {
  processOrder,
})(OrderDetail);
