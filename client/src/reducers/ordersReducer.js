import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ORDER_TYPE,
  ORDER_SELECT_CATEGORY,
  ORDER_SELECT_MENU,
  ORDER_MENU_RESET,
  ORDER_ITEM_SELECTED,
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
    orderItems: [
      {
        name: 'Vegetarian Mini Spring Rolls齐卷',
        description: 'Vegetarian Mini Spring Rolls',
        price: 4.9,
        menuOptions: [],
        itemTotal: 4.9,
      },
      {
        name: 'Crispy Seaweed干貝',
        description: 'Crispy Seaweed',
        price: 4.9,
        menuOptions: [],
        itemTotal: 4.9,
      },
      {
        name: 'Seafood Hors d\'oeuvres海先并',
        description: 'Seafood Hors d\'oeuvres (For 2 Persons or More)',
        price: 9.4,
        menuOptions: [
          {
            description: 'Test',
            additionalCost: 2,
          },
          {
            description: 'Test Option',
            additionalCost: 1.5,
          },
        ],
        itemTotal: 12.9,
      },
    ],
  },
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
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        isOpenOrderModal: true,
      };
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        isOpenOrderModal: false,
      };
    case SET_ORDER_TYPE:
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
    case ORDER_MENU_RESET: {
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
    default:
      return state;
  }
}
