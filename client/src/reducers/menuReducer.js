import {
  MENU_FETCH_REQUEST,
  MENU_FETCH_SUCCESS,
  MENU_FETCH_ERROR,
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  current: undefined,
  errors: {},
  msg: undefined
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

    case MENU_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "Saving menu"
      };
    case MENU_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        current: action.payload,
        msg: "Menu saved successfully"
      };
    case MENU_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        msg: "There is error saving menu"
      };
    default:
      return state;
  }
}
