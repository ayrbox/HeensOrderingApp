import {
  MENU_FETCH_REQUEST,
  MENU_FETCH_SUCCESS,
  MENU_FETCH_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  current: undefined,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case MENU_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {}
      };
    case MENU_FETCH_ERROR:
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
