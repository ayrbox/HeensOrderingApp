import axios from "axios";
import {
  MENU_FETCH_REQUEST,
  MENU_FETCH_SUCCESS,
  MENU_FETCH_ERROR,
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_ERROR
} from "./types";

// GET         /api/menus/
export const getMenus = () => dispatch => {
  dispatch({
    type: MENU_FETCH_REQUEST
  });
  axios
    .get(`/api/menus`)
    .then(res =>
      dispatch({
        type: MENU_FETCH_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MENU_FETCH_ERROR,
        payload: err.response.data
      })
    );
};

// GET         /api/menus/:id
// GET         /api/category/:cateogryId

// POST        /api/menus/
export const createMenu = menu => dispatch => {
  dispatch({
    type: MENU_CREATE_REQUEST
  });

  axios
    .post(`/api/menus/`, menu)
    .then(res =>
      dispatch({
        type: MENU_CREATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MENU_CREATE_ERROR,
        payload: err.response.data
      })
    );
};
// PUT         /api/menus/:id
// DELETE      /api/menus/:id
// POST        /api/menus/:id/options
// DELETE      /:id/options/:optionId
