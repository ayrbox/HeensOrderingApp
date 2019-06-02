import { connect } from 'react-redux';
import NewOrder from './NewOrder';

const mapState = state => ({
  orderType: state.orders.orderType,
});

export default connect(mapState, {})(NewOrder);
