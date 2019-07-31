import { connect } from 'react-redux';
import OrderSummaryModal from './OrderSummaryModal';

import {
  setTable,
  setDeliveryAddress,
  setDiscount,
  setStatus,
  addNote,
  processOrder,
  showSummary,
  resetOrder,
} from '../../store/newOrder';

const mapState = state => ({
  order: state.newOrder,
});

export default connect(mapState, {
  setTable,
  setDeliveryAddress,
  addNote,
  setDiscount,
  setStatus,
  processOrder,
  showSummary,
  resetOrder
})(OrderSummaryModal);
