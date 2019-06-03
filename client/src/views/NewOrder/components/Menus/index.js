import { connect } from 'react-redux';
import Menus from './Menus';

import { setMenu } from '../../../../actions/orderActions';

const mapState = state => ({
  orderType: state.orders.orderType,
  category: state.orders.category,
});

export default connect(mapState, {
  setMenu,
})(Menus);
