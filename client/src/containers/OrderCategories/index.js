import { connect } from 'react-redux';
import Categories from './OrderCategories';

import { setCategory } from '../../actions/orderActions';

const mapState = state => ({
  orderType: state.orders.orderType,
  category: state.orders.category,
});

export default connect(mapState, {
  setCategory,
})(Categories);
