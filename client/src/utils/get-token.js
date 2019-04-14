import jwtDecode from 'jwt-decode';
import store from '../store';
import setToken from './set-token';
import { SET_USER } from '../actions/types';
import { logoutUser } from '../actions/authActions';

const getToken = () => {
  if (localStorage.token) {
    setToken(localStorage.token);

    const user = jwtDecode(localStorage.token);

    store.dispatch({
      type: SET_USER,
      payload: user,
    });

    const now = Date.now() / 1000;
    if (user.exp < now) {
      store.dispatch(logoutUser());
      window.location.href = '/login';
    }
  }
};

export default getToken;
