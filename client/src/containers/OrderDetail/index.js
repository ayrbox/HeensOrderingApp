import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';

const mapState = state => ({
  order: state.orders.currentOrder,
});

export default connect(mapState)(OrderDetail);
