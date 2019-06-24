import {
  SELECT_MENU_ITEM,
  SELECT_MENU_OPTION,
  CONFIRM_MENU_ITEM,
  CANCEL_MENU_ITEM,
  SET_ORDER_TYPE,
} from '../actions/types';

const initialState = {
  order: {
    orderItems: [],
  }, // this is current order // items with option, date, order type
  menuItem: undefined, // current menu item selected to be added in order
  orderTypes: {
    delivery: 'Delivery',
    collection: 'Collection',
    table: 'Table Order',
  },
  orderStatuses: {
    ordered: 'Ordered',
    paid: 'Paid',
    processing: 'Processing',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    collected: 'Collected',
    served: 'Served',
  },
  loading: false,
  msg: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_TYPE: {
      const { orderType, deliveryAddress, tableNo } = action.payload;
      return {
        ...state,
        order: {
          ...state.order,
          orderType,
          deliveryAddress,
          tableNo,
        },
      };
    }
    case SELECT_MENU_ITEM:
      return {
        ...state,
        menuItem: action.payload,
      };
    case SELECT_MENU_OPTION: {
      const { _id: selectedOptionId } = action.payload;
      const optionIndex = state.menuItem.menuOptions.findIndex(({
        _id: optionId,
      }) => optionId === selectedOptionId);

      return {
        ...state,
        menuItem: {
          ...state.menuItem,
          menuOptions: [
            ...state.menuItem.menuOptions.slice(0, optionIndex),
            { ...action.payload, selected: !action.payload.selected },
            ...state.menuItem.menuOptions.slice(optionIndex + 1),
          ],
        },
      };
    }
    case CONFIRM_MENU_ITEM: {
      const mItem = {
        ...state.menuItem,
        menuOptions: state.menuItem.menuOptions.filter(o => o.selected),
      };

      return {
        ...state,
        order: {
          ...state.order,
          orderItems: [...(state.order.orderItems || []), mItem],
        },
        menuItem: undefined,
      };
    }
    case CANCEL_MENU_ITEM:
      return {
        ...state,
        menuItem: undefined,
      };
    default:
      return state;
  }
}
