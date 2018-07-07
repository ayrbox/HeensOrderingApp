import jwt_decode from "jwt-decode";
import store from "../store";
import setToken from "./set-token";
import { logoutUser } from "../actions/authActions";
import { SET_USER } from "../actions/types";

export const getToken = () => {
  if (localStorage.token) {
    setToken(localStorage.token);

    const user = jwt_decode(localStorage.token);

    store.dispatch({
      type: SET_USER,
      payload: user
    });

    const now = Date.now() / 1000;
    if (user.exp < now) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    }
  }
};
