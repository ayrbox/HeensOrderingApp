import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  orders: ordersReducer,
});
