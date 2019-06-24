import { connect } from 'react-redux';
import OrderModal from './OrderModal';

import { closeOrderModal, setOrderType } from '../../actions/orderActions';


const mapState = state => ({
  isOpenOrderModal: state.orders.isOpenOrderModal,
});

export default connect(mapState, {
  closeOrderModal,
  setOrderType,
})(OrderModal);
