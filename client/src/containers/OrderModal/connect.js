import { connect } from 'react-redux';
import OrderModal from './OrderModal';

const mapState = state => ({
  isOpenOrderModal: state.orders.isOpenOrderModal,
});

export default connect(mapState)(OrderModal);
