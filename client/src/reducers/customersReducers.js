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
  CUSTOMER_UPDATE_ERROR
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

    case CUSTOMER_GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CUSTOMER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        errors: undefined
      };
    case CUSTOMER_GET_ERROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload
      };

    case CUSTOMER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CUSTOMER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        errors: undefined
      };
    case CUSTOMER_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
