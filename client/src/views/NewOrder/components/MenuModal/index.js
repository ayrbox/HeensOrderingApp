import { connect } from 'react-redux';
import MenuModal from './MenuModal';

import { resetMenu, selectOrderItem } from '../../../../actions/orderActions';

const mapState = state => ({
  menu: state.orders.menu,
  open: state.orders.openMenu,
});

export default connect(mapState, {
  resetMenu,
  selectOrderItem,
})(MenuModal);
