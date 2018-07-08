import axios from "axios";

import {
  FETCHING_CUSTOMER,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CLEAR_CUSTOMER
} from "./types";

export const fetchCustomers = () => dispatch => {
  dispatch({
    type: FETCHING_CUSTOMER
  });
  axios
    .get("/api/customers/")
    .then(res => {
      dispatch({
        type: FETCH_CUSTOMER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: FETCH_CUSTOMER_ERROR,
        payload: err.response.data
      })
    );
};

export const clearCustomers = () => dispatch => {
  dispatch({
    type: CLEAR_CUSTOMER
  });
};
