import axios from 'axios';

import {
  ORDER_RESET,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SET_DELIVERY_ADDRESS,
  ORDER_SET_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_SET_DISCOUNT,
  ORDER_ADD_NOTE,
  ORDER_PROCESS_REQUEST,
  ORDER_PROCESS_SUCCESS,
  ORDER_PROCESS_FAILED,
} from './types';

// Reset Order
export const resetOrder = () => (dispatch) => {
  dispatch({
    type: ORDER_RESET,
  });
};

// Open Order Pane
export const openOrderPane = () => (dispatch) => {
  dispatch({
    type: ORDER_OPEN_UI_PANE,
  });
};

// Close Order Pane
export const closeOrderPane = () => (dispatch) => {
  dispatch({
    type: ORDER_CLOSE_UI_PANE,
  });
};

// Set Order type
export const setOrderType = orderType => (dispatch) => {
  dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

// Set Delivery address
export const setDeliveryAddress = address => (dispatch) => {
  dispatch({
    type: ORDER_SET_DELIVERY_ADDRESS,
    payload: address,
  });
};

// Set Table
export const setTable = tableNo => (dispatch) => {
  dispatch({
    type: ORDER_SET_TABLE,
    payload: tableNo,
  });
};

// Add Order Item
export const addOrderItem = orderItem => (dispatch) => {
  dispatch({
    type: ORDER_ADD_ITEM,
    payload: orderItem,
  });
};

// Remove Order Item
export const removeOrderItem = idx => (dispatch) => {
  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: idx,
  });
};

// Set Discount
export const setDiscount = percent => (dispatch) => {
  dispatch({
    type: ORDER_SET_DISCOUNT,
    payload: percent,
  });
};

// Add Note
export const addNote = note => (dispatch) => {
  dispatch({
    type: ORDER_ADD_NOTE,
    payload: note,
  });
};

// Request Process
// Process Successful
// Process failed
export const processOrder = order => (dispatch) => {
  dispatch({
    type: ORDER_PROCESS_REQUEST,
  });

  return axios
    .post('/api/orders/', order)
    .then(() => {
      dispatch({
        type: ORDER_PROCESS_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_PROCESS_FAILED,
        payload: err.response.data,
      });
    });
};
