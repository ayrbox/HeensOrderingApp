import { connect } from 'react-redux';
import Categories from './OrderCategories';

import { setCategory } from '../../store/newOrder';

const mapState = state => ({
  categoryId: state.newOrder.categoryId,
});

export default connect(mapState, {
  setCategory,
})(Categories);
