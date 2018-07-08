import axios from "axios";

import {
  FETCHING_CUSTOMER,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CLEAR_CUSTOMER,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_ERROR
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

//@name   clearCustomers
//@desc   Clear list of customers
export const clearCustomers = () => dispatch => {
  dispatch({
    type: CLEAR_CUSTOMER
  });
};

//@name     createCustomer
//@desc     Send post for creating new customer
export const createCustomer = customer => dispatch => {
  dispatch({
    type: CUSTOMER_CREATE_REQUEST
  });

  axios
    .post("/api/customers/", customer)
    .then(res =>
      dispatch({
        type: CUSTOMER_CREATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CUSTOMER_CREATE_ERROR,
        payload: err.response.data
      })
    );
};
