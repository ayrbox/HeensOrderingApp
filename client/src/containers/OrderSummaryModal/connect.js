import { connect } from 'react-redux';
import OrderSummaryModal from './OrderSummaryModal';

import {
  setTable,
  setDeliveryAddress,
  setDiscount,
  addNote,
  processOrder,
} from '../../actions/newOrderActions';

const mapState = state => ({
  order: state.newOrder,
});

export default connect(mapState, {
  setTable,
  setDeliveryAddress,
  addNote,
  setDiscount,
  processOrder,
})(OrderSummaryModal);
