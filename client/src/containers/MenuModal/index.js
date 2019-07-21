import { connect } from 'react-redux';
import MenuModal from './MenuModal';

// import { resetMenu, selectOrderItem } from '../../actions/newOrderActions';

const mapState = state => ({
  menu: state.newOrder.menu,
  open: state.newOrder.openMenu,
});

export default connect(mapState, {
  resetMenu: () => {},
  selectOrderItem: () => {},
})(MenuModal);
