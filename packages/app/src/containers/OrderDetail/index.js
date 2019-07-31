import { connect } from 'react-redux';

import OrderDetail from './OrderDetail';
import { showSummary } from '../../store/newOrder';

const mapState = state => ({
  newOrder: state.newOrder,
});

export default connect(mapState, {
  showSummary,
})(OrderDetail);
