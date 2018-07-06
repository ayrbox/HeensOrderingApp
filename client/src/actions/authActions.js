import axios from "axios";

import jwt_decode from "jwt-decode";

export const loginUser = (loginModel, history) => dispatch => {
  axios
    .post("/api/users/login", loginModel)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("token", token);

      //set token

      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
