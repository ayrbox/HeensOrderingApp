import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {}
      };
    }
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.payload
      };
    default:
      return state;
  }
}
