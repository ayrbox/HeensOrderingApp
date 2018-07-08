import {
  FETCHING_CUSTOMER,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CLEAR_CUSTOMER
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  errors: {}
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
    default:
      return state;
  }
}
