import { connect } from 'react-redux';
import MenuModal from './MenuModal';

import { resetOrder, addOrderItem } from '../../actions/newOrderActions';

const mapState = state => ({
  menu: state.newOrder.selectedMenu,
  open: state.newOrder.openMenuModal,
});

export default connect(mapState, {
  resetOrder,
  addOrderItem,
})(MenuModal);
