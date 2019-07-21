import { connect } from 'react-redux';
import Menus from './OrderMenus';

// import { setMenu } from '../../actions/newOrderActions';

const mapState = state => ({
  orderType: state.newOrder.orderType,
  category: state.newOrder.categoryId,
});

export default connect(mapState, {
  setMenu: () => {},
})(Menus);
