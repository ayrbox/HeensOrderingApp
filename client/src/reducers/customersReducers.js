import {
  FETCHING_CUSTOMER,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CLEAR_CUSTOMER,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  current: undefined,
  errors: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CUSTOMER:
      return {
        ...state,
        loading: true
      };
    case FETCH_CUSTOMER_SUCCESS:
      return {
        loading: false,
        list: action.payload,
        errors: {}
      };
    case FETCH_CUSTOMER_ERROR:
      return {
        loading: false,
        list: [],
        errors: action.payload
      };
    case CLEAR_CUSTOMER:
      return initialState;

    case CUSTOMER_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        errors: undefined
      };
    case CUSTOMER_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload
      };
    default:
      return state;
  }
}
