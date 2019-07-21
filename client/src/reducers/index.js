import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import newOrderReducer from './newOrderReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  newOrder: newOrderReducer,
});
