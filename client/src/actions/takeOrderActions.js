// import axios from "axios";
import {
  SELECT_MENU_ITEM,
  SELECT_MENU_OPTION,
  CONFIRM_MENU_ITEM,
  CANCEL_MENU_ITEM
} from "./types";

export const selectMenuItem = menu => dispatch => {
  dispatch({
    type: SELECT_MENU_ITEM,
    payload: menu
  });
};

export const confirmMenuItem = () => dispatch => {
  dispatch({
    type: CONFIRM_MENU_ITEM
  });
};

export const cancelMenuItem = () => dispatch => {
  dispatch({
    type: CANCEL_MENU_ITEM
  });
};

export const selectOption = option => dispatch => {
  dispatch({
    type: SELECT_MENU_OPTION,
    payload: option
  });
};
