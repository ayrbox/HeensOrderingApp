import {
  ORDER_RESET,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SET_DELIVERY_ADDRESS,
  ORDER_SET_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_SET_DISCOUNT,
  ORDER_ADD_NOTE,
  ORDER_PROCESS_REQUEST,
  ORDER_PROCESS_SUCCESS,
  ORDER_PROCESS_FAILED,
  ORDER_SET_CATEGORY,
  ORDER_SET_MENU,
  ORDER_SHOW_SUMMARY,
  ORDER_SET_STATUS,
} from '../actions/types';

export const initialState = {
  requestInProgress: false,
  requestSuccess: false,
  categoryId: undefined,
  openNewOrderPane: false,
  orderType: 'table',
  deliveryAddress: undefined,
  tableNo: undefined,
  orderItems: [],
  subTotal: 0,
  discount: 0,
  orderTotal: 0,
  note: '',

  selectedMenu: undefined,
  openMenuModal: false,
  openSummary: false,
  status: 'ordered',
};

// TODO: move methods utils with tests.
// Get sub total from order items.
const getSubTotal = orderItems => orderItems.reduce((_, { itemTotal }) => _ + itemTotal, 0);

// Calculate total from subTotal and discount.
const calculateTotal = (subTotal, discount) => (subTotal * (100 - discount)) / 100;

// Return subtotal, total with discount
const getTotals = (orderItems, discount) => {
  const subTotal = getSubTotal(orderItems);
  const orderTotal = calculateTotal(subTotal, discount);
  return {
    subTotal,
    orderTotal,
  };
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ORDER_OPEN_UI_PANE:
      return {
        ...state,
        openNewOrderPane: true,
      };
    case ORDER_CLOSE_UI_PANE:
      return {
        ...state,
        openNewOrderPane: false,
      };
    case ORDER_SET_TYPE:
      return {
        ...state,
        orderType: action.payload,
      };
    case ORDER_SET_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: state.orderType === 'delivery' ? action.payload : undefined,
      };
    case ORDER_SET_TABLE:
      return {
        ...state,
        tableNo: state.orderType === 'table' ? action.payload : undefined,
      };
    case ORDER_ADD_ITEM: {
      const orderItems = [
        ...state.orderItems,
        action.payload,
      ];
      const { discount } = state;
      return {
        ...state,
        orderItems,
        selectedMenu: undefined,
        openMenuModal: false,
        ...getTotals(orderItems, discount),
      };
    }
    case ORDER_REMOVE_ITEM: {
      const orderItems = [...state.orderItems];
      const itemIndex = action.payload;
      orderItems.splice(itemIndex, 1);
      const { discount } = state;
      return {
        ...state,
        orderItems,
        ...getTotals(orderItems, discount),
      };
    }

    case ORDER_SET_DISCOUNT: {
      const discount = action.payload;
      const { subTotal } = state;
      const orderTotal = calculateTotal(subTotal, discount);
      return {
        ...state,
        discount,
        orderTotal,
      };
    }
    case ORDER_ADD_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case ORDER_PROCESS_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestSuccess: false,
      };
    case ORDER_PROCESS_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestSuccess: false,
      };
    case ORDER_PROCESS_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        requestSuccess: true,
      };
    case ORDER_SET_CATEGORY:
      return {
        ...state,
        categoryId: action.payload.categoryId,
      };
    case ORDER_SET_MENU:
      return {
        ...state,
        selectedMenu: action.payload,
        openMenuModal: true,
      };
    case ORDER_SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ORDER_SHOW_SUMMARY:
      return {
        ...state,
        openSummary: action.payload || false,
      };
    case ORDER_RESET:
      return initialState;
    default:
      return state;
  }
}
