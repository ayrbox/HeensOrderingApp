import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';
import { showSummary } from '../../actions/newOrderActions';

const mapState = state => ({
  newOrder: state.newOrder,
});

export default connect(mapState, {
  showSummary,
})(OrderDetail);
