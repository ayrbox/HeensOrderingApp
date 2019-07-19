import { calculateTotal } from '../utils/format-order';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SELECT_CATEGORY,
  ORDER_SELECT_MENU,
  ORDER_RESET,
  ORDER_ITEM_SELECTED,
  ORDER_UPDATE_TOTAL,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  list: [],
  errors: {},
  isOpenOrderModal: true,
  orderType: 'table',
  selectedCategory: undefined,
  menu: undefined,
  openMenu: false,
  currentOrder: {
    orderType: 'table',
    orderItems: [],
  },
  requestSuccess: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {},
      };
    }
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.payload,
      };
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
      };
    case UPDATE_ORDER_STATUS_SUCCESS: {
      const { _id: orderIdToUpdate } = action.payload;
      const updateIndex = state.list.findIndex(({ _id: orderId }) => orderId === orderIdToUpdate);
      return {
        ...state,
        loading: false,
        list: [
          ...state.list.slice(0, updateIndex),
          action.payload,
          ...state.list.slice(updateIndex + 1),
        ],
      };
    }
    case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ORDER_OPEN_UI_PANE:
      return {
        ...state,
        isOpenOrderModal: true,
      };
    case ORDER_CLOSE_UI_PANE:
      return {
        ...state,
        isOpenOrderModal: false,
      };
    case ORDER_SET_TYPE:
      return {
        ...state,
        orderType: payload, // TODO: remove ordertype
        currentOrder: {
          ...state.currentOrder,
          orderType: payload,
        },
      };
    case ORDER_SELECT_CATEGORY: {
      return {
        ...state,
        category: payload,
      };
    }
    case ORDER_SELECT_MENU: {
      return {
        ...state,
        menu: payload,
        openMenu: true,
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        menu: undefined,
        openMenu: false,
      };
    }
    case ORDER_ITEM_SELECTED: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderItems: [...state.currentOrder.orderItems, payload],
        },
        menu: undefined,
        openMenu: false,
      };
    }
    case ORDER_UPDATE_TOTAL: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          ...calculateTotal(state.currentOrder),
        },
      };
    }
    case SAVE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        requestSuccess: false,
      };
    case SAVE_ORDER_SUCCESS:
      return {
        currentOrder: {
          ...initialState.currentOrder,
        },
        loading: false,
        requestSuccess: true,
        msg: 'Order saved successfully',
      };
    case SAVE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        requestSuccess: false,
        msg: 'Unable to save error',
      };
    default:
      return state;
  }
}
