import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  list: [],
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {},
      };
    }
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.payload,
      };
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
      };
    case UPDATE_ORDER_STATUS_SUCCESS:
      const updateIndex = state.list.findIndex(o => o._id === action.payload._id);
      return {
        ...state,
        loading: false,
        list: [
          ...state.list.slice(0, updateIndex),
          action.payload,
          ...state.list.slice(updateIndex + 1),
        ],
      };
    case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
