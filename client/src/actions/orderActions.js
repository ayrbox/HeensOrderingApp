import axios from "axios";

//@actions
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR
} from "./types";

export const getOrders = () => dispatch => {
  dispatch({
    type: GET_ORDERS_REQUEST
  });

  axios
    .get("/api/orders/")
    .then(res =>
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDERS_ERROR,
        payload: err.response.data
      })
    );
};

export const updateOrder = (id, status) => dispatch => {
  dispatch({
    type: UPDATE_ORDER_STATUS_REQUEST
  });

  axios
    .post(`/api/orders/${id}`, {
      status: status
    })
    .then(res =>
      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_ORDER_STATUS_ERROR,
        payload: err.response.data
      })
    );
};
