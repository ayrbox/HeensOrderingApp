import axios from 'axios';

// @actions
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ORDER_TYPE,
  ORDER_SELECT_CATEGORY,
} from './types';

// @action - getOrders
export const getOrders = () => (dispatch) => {
  dispatch({
    type: GET_ORDERS_REQUEST,
  });

  axios
    .get('/api/orders/')
    .then(res => dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ORDERS_ERROR,
      payload: err.response.data,
    }));
};

// @action - updateOrder
export const updateOrder = (id, status) => (dispatch) => {
  dispatch({
    type: UPDATE_ORDER_STATUS_REQUEST,
  });

  axios
    .put(`/api/orders/${id}`, {
      status,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => dispatch({
      type: UPDATE_ORDER_STATUS_ERROR,
      payload: err.response.data,
    }));
};


export const openOrderModal = () => (dispatch) => {
  dispatch({
    type: OPEN_ORDER_MODAL,
  });
};

export const closeOrderModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_ORDER_MODAL,
  });
};

// order taking process
export const setOrderType = orderType => (dispatch) => {
  dispatch({
    type: SET_ORDER_TYPE,
    payload: orderType,
  });
};


export const setCategory = category => (dispatch) => {
  dispatch({
    type: ORDER_SELECT_CATEGORY,
    payload: category,
  });
};
