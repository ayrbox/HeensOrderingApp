import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_USER } from './types';
import setToken from '../utils/set-token';

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
