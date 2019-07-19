import axios from 'axios';

// @actions
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SELECT_CATEGORY,
  ORDER_SELECT_MENU,
  ORDER_RESET,
  ORDER_ITEM_SELECTED,
  ORDER_UPDATE_TOTAL,
  SAVE_ORDER,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_ERROR,
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
    type: ORDER_OPEN_UI_PANE,
  });
};

export const closeOrderModal = () => (dispatch) => {
  dispatch({
    type: ORDER_CLOSE_UI_PANE,
  });
};

// order taking process
export const setOrderType = orderType => (dispatch) => {
  dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};


export const setCategory = category => (dispatch) => {
  dispatch({
    type: ORDER_SELECT_CATEGORY,
    payload: category,
  });
};

export const setMenu = menu => (dispatch) => {
  dispatch({
    type: ORDER_SELECT_MENU,
    payload: menu,
  });
};

export const resetMenu = () => (dispatch) => {
  dispatch({
    type: ORDER_RESET,
  });
};


export const selectOrderItem = orderItem => (dispatch) => {
  dispatch({
    type: ORDER_ITEM_SELECTED,
    payload: orderItem,
  });

  setTimeout(() => {
    dispatch({
      type: ORDER_UPDATE_TOTAL,
    });
  }, 100);
};

export const saveOrder = order => (dispatch) => {
  dispatch({
    type: SAVE_ORDER,
  });

  axios
    .post('/api/orders/', order)
    .then(res => dispatch({
      type: SAVE_ORDER_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: SAVE_ORDER_ERROR,
      payload: err.response.data,
    }));
};
