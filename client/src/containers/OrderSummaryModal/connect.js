import { connect } from 'react-redux';
import OrderSummaryModal from './OrderSummaryModal';

import { processOrder } from '../../actions/newOrderActions';

const mapState = state => ({
  order: state.newOrder,
});

export default connect(mapState, {
  processOrder,
})(OrderSummaryModal);
