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

const getSubTotal = orderItems => orderItems.reduce((_, { itemTotal }) => _ + itemTotal, 0);


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
    case ORDER_ADD_ITEM: {
      const orderItems = [
        ...state.orderItems,
        action.payload,
      ];
      const subTotal = getSubTotal(orderItems);
      return {
        ...state,
        orderItems,
        subTotal,
      };
    }
    case ORDER_REMOVE_ITEM: {
      const orderItems = [ ...state.orderItems ];
      const itemIndex = action.payload;
      orderItems.splice(1, 1);
      const subTotal = getSubTotal(orderItems);
      return {
        ...state,
        orderItems,
        subTotal,
      };
    }

    case ORDER_SET_DISCOUNT: {
      const discount = action.payload;
      const { subTotal } = state;
      const orderTotal = (subTotal * (100 - discount)) / 100;
      return {
        ...state,
        discount,
        orderTotal,
      };
    }
    case ORDER_RESET:
      return initialState;
    default:
      return state;
  }
}
