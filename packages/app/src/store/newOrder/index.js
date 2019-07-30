import axios from 'axios';

export const ORDER_OPEN_UI_PANE = 'ORDER_OPEN_UI_PANE';
export const ORDER_CLOSE_UI_PANE = 'ORDER_CLOSE_UI_PANE';
export const ORDER_RESET = 'ORDER_RESET';
export const ORDER_SET_TYPE = 'ORDER_SET_TYPE';
export const ORDER_SET_TABLE = 'ORDER_SET_TABLE';
export const ORDER_SET_DELIVERY_ADDRESS = 'ORDER_SET_DELIVERY_ADDRESS';
export const ORDER_ADD_ITEM = 'ORDER_ADD_ITEM';
export const ORDER_REMOVE_ITEM = 'ORDER_REMOVE_ITEM';
export const ORDER_SET_DISCOUNT = 'ORDER_SET_DISCOUNT';
export const ORDER_ADD_NOTE = 'ORDER_ADD_NOTE';
export const ORDER_SET_CATEGORY = 'ORDER_SET_CATEGORY';
export const ORDER_SET_MENU = 'ORDER_SET_MENU';

export const ORDER_PROCESS_REQUEST = 'ORDER_PROCESS';
export const ORDER_PROCESS_SUCCESS = 'ORDER_PROCESS_SUCCESS';
export const ORDER_PROCESS_FAILED = 'ORDER_PROCESS_FAILED';
export const ORDER_SHOW_SUMMARY = 'ORDER_SHOW_SUMMARY';
export const ORDER_SET_STATUS = 'ORDER_SET_STATUS';

export const ACTIONS = {
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_RESET,
  ORDER_SET_TABLE,
  ORDER_SET_DELIVERY_ADDRESS,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_SET_DISCOUNT,
  ORDER_ADD_NOTE,
  ORDER_PROCESS_REQUEST,
  ORDER_PROCESS_SUCCESS,
  ORDER_PROCESS_FAILED,
  ORDER_SET_CATEGORY,
  ORDER_SET_MENU,
  ORDER_SET_STATUS,
  ORDER_SHOW_SUMMARY,
};

// Reset Order
export const resetOrder = () => (dispatch) => {
  dispatch({
    type: ORDER_RESET,
  });
};

// Open Order Pane
export const openOrderPane = () => (dispatch) => {
  dispatch({
    type: ORDER_OPEN_UI_PANE,
  });
};

// Close Order Pane
export const closeOrderPane = () => (dispatch) => {
  dispatch({
    type: ORDER_CLOSE_UI_PANE,
  });
};

// Set Order type
export const setOrderType = orderType => (dispatch) => {
  dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

// Set Delivery address
export const setDeliveryAddress = address => (dispatch) => {
  dispatch({
    type: ORDER_SET_DELIVERY_ADDRESS,
    payload: address,
  });
};

// Set Table
export const setTable = tableNo => (dispatch) => {
  dispatch({
    type: ORDER_SET_TABLE,
    payload: tableNo,
  });
};

// Add Order Item
export const addOrderItem = orderItem => (dispatch) => {
  dispatch({
    type: ORDER_ADD_ITEM,
    payload: orderItem,
  });
};

// Remove Order Item
export const removeOrderItem = idx => (dispatch) => {
  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: idx,
  });
};

// Set Discount
export const setDiscount = percent => (dispatch) => {
  dispatch({
    type: ORDER_SET_DISCOUNT,
    payload: percent,
  });
};

// Add Note
export const addNote = note => (dispatch) => {
  dispatch({
    type: ORDER_ADD_NOTE,
    payload: note,
  });
};

// Request Process
// Process Successful
// Process failed
export const processOrder = order => (dispatch) => {
  dispatch({
    type: ORDER_PROCESS_REQUEST,
  });

  return axios
    .post('/api/orders/', order)
    .then(() => {
      dispatch({
        type: ORDER_PROCESS_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_PROCESS_FAILED,
        payload: err.response.data,
      });
    });
};

export const setCategory = categoryId => (dispatch) => {
  dispatch({
    type: ORDER_SET_CATEGORY,
    payload: {
      categoryId,
    },
  });
};

export const setMenu = menu => (dispatch) => {
  dispatch({
    type: ORDER_SET_MENU,
    payload: menu,
  });
};

export const showSummary = (show = true) => (dispatch) => {
  dispatch({
    type: ORDER_SHOW_SUMMARY,
    payload: show,
  });
};

export const setStatus = status => (dispatch) => {
  dispatch({
    type: ORDER_SET_STATUS,
    payload: status,
  });
};

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
