import { combineReducers } from 'redux';

import authReducer from './auth';
import newOrderReducer from './newOrder';

export default combineReducers({
  auth: authReducer,
  newOrder: newOrderReducer,
});