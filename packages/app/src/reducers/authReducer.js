import { SET_USER, LOGOUT } from '../actions/types';
import isEmpty from '../utils/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
}
