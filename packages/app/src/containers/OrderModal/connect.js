import { connect } from 'react-redux';
import OrderModal from './OrderModal';

import { closeOrderPane, setOrderType } from '../../store/newOrder';

const mapState = state => ({
  isOpenOrderModal: state.newOrder.openNewOrderPane,
});

export default connect(mapState, {
  closeOrderPane,
  setOrderType,
})(OrderModal);
