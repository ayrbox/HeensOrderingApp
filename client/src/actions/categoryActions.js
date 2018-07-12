import axios from "axios";
import {
  CATEGORY_FETCH_REQUEST,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_ERROR,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_ERROR,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_ERROR,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_ERROR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERRROR
} from "./types";

export const getCategories = () => dispatch => {
  dispatch({
    type: CATEGORY_FETCH_REQUEST
  });

  axios
    .get(`/api/categories/`)
    .then(res =>
      dispatch({
        type: CATEGORY_FETCH_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CATEGORY_FETCH_ERROR,
        payload: err.response.data
      })
    );
};

export const getCategory = id => dispatch => {
  dispatch({
    type: CATEGORY_GET_REQUEST
  });

  axios
    .get(`/api/categories/${id}`)
    .then(res =>
      dispatch({
        type: CATEGORY_GET_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CATEGORY_GET_ERROR,
        payload: err.response.data
      })
    );
};

export const createCategory = category => dispatch => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST
  });

  axios
    .post("/api/customers/", category)
    .then(res =>
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CATEGORY_CREATE_ERROR,
        payload: err.response.data
      })
    );
};

export const updateCategory = (id, category) => {
  dispatch({
    type: CATEGORY_UPDATE_REQUEST
  });

  axios
    .put(`/api/categories/${id}`, category)
    .then(res =>
      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CATEGORY_UPDATE_ERROR,
        payload: err.response.data
      })
    );
};

export const deleteCategory = id => {
  dispatch({
    type: CATEGORY_DELETE_REQUEST
  });

  axios
    .delete(`/api/categories/${id}`)
    .then(res =>
      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CATEGORY_DELETE_ERRROR,
        payload: err.response.data
      })
    );
};
