import { connect } from 'react-redux';
import OrderModal from './OrderModal';

import { resetOrder, setOrderType } from '../../actions/newOrderActions';

const mapState = state => ({
  isOpenOrderModal: state.newOrder.openNewOrderPane,
});

export default connect(mapState, {
  resetOrder,
  setOrderType,
})(OrderModal);
