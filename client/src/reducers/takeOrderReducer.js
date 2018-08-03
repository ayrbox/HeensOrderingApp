import {
  SELECT_MENU_ITEM,
  SELECT_MENU_OPTION,
  CONFIRM_MENU_ITEM,
  CANCEL_MENU_ITEM
} from "./types";

const initialState = {
  order: [], //this is current order
  current: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return {
        ...state,
        current: action.payload
      };

    default:
      return state;
  }
}
