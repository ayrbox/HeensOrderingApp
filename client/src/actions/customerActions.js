import axios from 'axios';

import {
  FETCHING_CUSTOMER,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CLEAR_CUSTOMER,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_ERROR,
  CUSTOMER_GET_REQUEST,
  CUSTOMER_GET_SUCCESS,
  CUSTOMER_GET_ERROR,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_ERROR,
} from './types';

export const fetchCustomers = () => (dispatch) => {
  dispatch({
    type: FETCHING_CUSTOMER,
  });
  axios
    .get('/api/customers/')
    .then((res) => {
      dispatch({
        type: FETCH_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => dispatch({
      type: FETCH_CUSTOMER_ERROR,
      payload: err.response.data,
    }));
};

// @name   clearCustomers
// @desc   Clear list of customers
export const clearCustomers = () => (dispatch) => {
  dispatch({
    type: CLEAR_CUSTOMER,
  });
};

// @name     createCustomer
// @desc     Send post for creating new customer
export const createCustomer = customer => (dispatch) => {
  dispatch({
    type: CUSTOMER_CREATE_REQUEST,
  });

  axios
    .post('/api/customers/', customer)
    .then(res => dispatch({
      type: CUSTOMER_CREATE_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: CUSTOMER_CREATE_ERROR,
      payload: err.response.data,
    }));
};

// @name     getCustomer
// @desc     GET request to get detail of customer
export const getCustomer = id => (dispatch) => {
  dispatch({
    type: CUSTOMER_GET_REQUEST,
  });

  axios
    .get(`/api/customers/${id}`)
    .then(res => dispatch({
      type: CUSTOMER_GET_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: CUSTOMER_GET_ERROR,
      payload: err.response.data,
    }));
};

// @name   updateCustomer
// @desc   PUT update customer details
export const updateCustomer = (id, data) => (dispatch) => {
  dispatch({
    type: CUSTOMER_UPDATE_REQUEST,
  });

  axios
    .put(`/api/customers/${id}`, data)
    .then(res => dispatch({
      type: CUSTOMER_UPDATE_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: CUSTOMER_UPDATE_ERROR,
      payload: err.response.data,
    }));
};
