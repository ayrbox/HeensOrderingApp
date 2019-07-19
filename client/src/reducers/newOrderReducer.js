import {
  ORDER_RESET,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SET_DELIVERY_ADDRESS,
  ORDER_SET_TABLE,
  ORDER_ADD_ITEM,
} from '../actions/types';

export const initialState = {
  requestInProgress: true,
  requestSuccess: false,
  categoryId: undefined, // Category selected
  openNewOrderPane: false,

  orderType: 'table', // TODO: no default but need to validate
  deliveryAddress: undefined, // TODO: conditional validation before saving
  tableNo: undefined, // TODO: conditional validation required

  orderItems: [], // TODO: validate before saving
  subTotal: 0,
  discount: 0,
  orderTotal: 0,
  note: '',
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
        deliveryAddress: state.orderType === 'delivery' ? action.payload: undefined,
      };
    case ORDER_SET_TABLE:
      return {
        ...state,
        tableNo: state.orderType === 'eat-in' ? action.payload: undefined,
      };
    case ORDER_ADD_ITEM:
      return {
        ...state,
        orderItems: [
          ...state.orderItems,
          action.payload,
        ]
      }
    case ORDER_RESET:
      return initialState;
    default:
      return state;
  }
}
