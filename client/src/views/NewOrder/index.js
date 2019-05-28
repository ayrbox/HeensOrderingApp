import { connect } from 'react-redux';
import NewOrder from './NewOrder';

import { getMenus } from '../../actions/menuActions';


const mapState = state => ({
  orderType: state.orders.orderType,
  menus: state.menus.list,
});

export default connect(mapState, {
  getMenus,
})(NewOrder);
