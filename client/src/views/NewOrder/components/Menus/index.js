import { connect } from 'react-redux';
import Menus from './Menus';

const mapState = state => ({
  orderType: state.orders.orderType,
  category: state.orders.category,
});

export default connect(mapState, null)(Menus);
