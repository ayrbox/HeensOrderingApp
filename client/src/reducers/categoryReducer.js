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
  CATEGORY_DELETE_ERRROR,
} from '../actions/types';

const initialState = {
  loading: false,
  list: [],
  current: undefined,
  errors: undefined,
  msg: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CATEGORY_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        msg: 'Requesting list of categories...',
      };
    case CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: {},
        msg: undefined,
      };
    case CATEGORY_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.errors,
        msg: 'There is a problem fetching categories...',
      };

    case CATEGORY_GET_REQUEST:
      return {
        ...state,
        loading: true,
        msg: 'Getting category details',
      };

    case CATEGORY_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        errors: {},
        msg: undefined,
      };

    case CATEGORY_GET_ERROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload,
        msg: 'There is a problem getting category',
      };

    case CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: 'Saving category',
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        current: action.payload,
        errors: {},
        msg: 'Category saved',
      };
    case CATEGORY_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload,
        msg: 'There is a problem creating category',
      };

    case CATEGORY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: 'Updating category',
      };

    case CATEGORY_UPDATE_SUCCESS:
      // Immutable array update
      // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#inserting-and-removing-items-in-arrays

      const updateIndex = state.list.findIndex(c => c._id === action.payload._id);
      return {
        ...state,
        list: [
          ...state.list.slice(0, updateIndex),
          action.payload,
          ...state.list.slice(updateIndex + 1),
        ],
        loading: false,
        current: action.payload,
        errors: {},
        msg: 'Category updated',
      };

    case CATEGORY_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload,
        msg: 'There is problem updating category',
      };

    case CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: 'Deleteing category',
      };

    case CATEGORY_DELETE_SUCCESS:
      const deleteIndex = state.list.findIndex(c => c._id === action.payload._id);
      return {
        ...state,
        list: [
          ...state.list.slice(0, deleteIndex),
          ...state.list.slice(deleteIndex + 1),
        ],
        loading: false,
        current: undefined,
        errors: {},
        msg: 'Category delected',
      };

    case CATEGORY_DELETE_ERRROR:
      return {
        ...state,
        loading: false,
        current: undefined,
        errors: action.payload,
        msg: 'There is a problem deleting categories',
      };

    default:
      return state;
  }
}
