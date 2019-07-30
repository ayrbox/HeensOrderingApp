import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setToken from '../../utils/set-token';
import isEmpty from '../../utils/is-empty';

export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const ACTIONS = {
  SET_USER,
  LOGOUT,
  GET_ERRORS,
  CLEAR_ERRORS,
};

export const initialState = {
  isAuthenticated: false,
  user: {},
};

export const loginUser = (loginModel, history) => (dispatch) => {
  axios
    .post('/api/users/login', loginModel)
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('token', token);

      // set token
      setToken(token);

      const decoded = jwtDecode(token);
      dispatch({
        type: SET_USER,
        payload: decoded,
      });

      history.push('/orders');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setToken(false);
  dispatch({
    type: SET_USER,
    payload: {},
  });
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
