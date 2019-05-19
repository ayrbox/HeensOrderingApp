import { connect } from 'react-redux';
import OrderModal from './OrderModal';

import { closeOrderModal } from '../../actions/orderActions';

const mapState = state => ({
  isOpenOrderModal: state.orders.isOpenOrderModal,
});

export default connect(mapState, {
  closeOrderModal,
})(OrderModal);
