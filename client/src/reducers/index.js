import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ordersReducer from './ordersReducer';
import newOrderReducer from './newOrderReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  orders: ordersReducer,
  newOrder: newOrderReducer,
});
