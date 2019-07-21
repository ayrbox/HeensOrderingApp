import axios from 'axios';
import ACTIONS from './types';

import {
  resetOrder,
  openOrderPane,
  closeOrderPane,
  setOrderType,
  setDeliveryAddress,
  setTable,
  addOrderItem,
  removeOrderItem,
  setDiscount,
  addNote,
  processOrder,
  setCategory,
  setMenu,
} from './newOrderActions';

jest.mock('axios');

describe('ACTIONS: newOrder', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  describe('resetOrder', () => {
    it('should dispatch action type ORDER_RESET', () => {
      resetOrder()(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_RESET,
      });
    });
  });

  describe('openOrderPane', () => {
    it('should dispatch action type ORDER_OPEN_UI_PANE', () => {
      openOrderPane()(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_OPEN_UI_PANE,
      });
    });
  });

  // Close Order Pane
  describe('closeOrderPane', () => {
    it('should dispatch action type ORDER_CLOSE_UI_PANE', () => {
      closeOrderPane()(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_CLOSE_UI_PANE,
      });
    });
  });

  // Set Order Type
  describe('setOrderType', () => {
    it('should dispatch action type ORDER_SET_TYPE', () => {
      setOrderType('eat-in')(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_TYPE,
        payload: 'eat-in',
      });
    });
  });

  // Set Delivery address
  describe('setDeliveryAddress', () => {
    it('should dispatch action type ORDER_SET_DELIVERY_ADDRESS', () => {
      const sampleAddress = {
        name: 'Micheal',
        contactNo: '0208552837',
        address: '100 London Road',
        postCode: 'WC1 1AX',
      };
      setDeliveryAddress(sampleAddress)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_DELIVERY_ADDRESS,
        payload: sampleAddress,
      });
    });
  });

  // set Table
  describe('setTable', () => {
    it('should dispatch action type ORDER_SET_TABLE', () => {
      setTable('TBL100')(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_TABLE,
        payload: 'TBL100',
      });
    });
  });

  // addOrderItem
  describe('addOrderItem', () => {
    it('should dispatch action type ORDER_ADD_ITEM', () => {
      const item = {
        name: 'Item 1',
        description: 'Test Item 1',
        price: 10,
        itemTotal: 10,
      };
      addOrderItem(item)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_ADD_ITEM,
        payload: item,
      });
    });
  });

  // removeOrderItem
  describe('removeOrderItem', () => {
    it('should dispatch action type ORDER_REMOVE_ITEM', () => {
      removeOrderItem(3)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_REMOVE_ITEM,
        payload: 3,
      });
    });
  });

  // setDiscount
  describe('setDiscount', () => {
    it('should dispatch action type ORDER_SET_DISCOUNT', () => {
      setDiscount(20)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_DISCOUNT,
        payload: 20,
      });
    });
  });

  // addNote
  describe('addNote', () => {
    it('should dispatch action type ORDER_ADD_NOTE', () => {
      addNote('Hello')(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_ADD_NOTE,
        payload: 'Hello',
      });
    });
  });


  // processOrder
  describe('processOrder', () => {
    describe('when order process is successful', () => {
      it('should dispatch action ORDER_PROCESS_REQUEST and ORDER_PROCESS_SUCCESS', async () => {
        axios.post.mockResolvedValue();

        const sampleOrder = {
          orderType: 'eat-in',
        };
        await processOrder(sampleOrder)(dispatch);
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.ORDER_PROCESS_REQUEST,
        });
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.ORDER_PROCESS_SUCCESS,
        });
      });
    });

    describe('when order process fails', () => {
      it('should dispatch action ORDER_PROCESS REQUEST and ORDER_PROCESS_FAILED', async () => {
        const errorPayload = {
          msg: 'Error Mock',
        };

        axios.post.mockRejectedValue({
          response: {
            data: errorPayload,
          },
        });
        const sampleOrder = {
          orderType: 'eat-in',
        };
        await processOrder(sampleOrder)(dispatch);
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.ORDER_PROCESS_REQUEST,
        });
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.ORDER_PROCESS_FAILED,
          payload: errorPayload,
        });
      });
    });
  });

  // Set Category
  describe('set category', () => {
    it('should dispatch action ORDER_SET_CATEGORY', () => {
      const categoryId = '12345678900';
      setCategory(categoryId)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_CATEGORY,
        payload: {
          categoryId,
        },
      });
    });
  });

  // setMenu
  describe('setMenu', () => {
    it('should dispatch action ORDER_SET_MENU', () => {
      const sampleMenu = {
        name: 'Test',
        description: 'Test Menu Item',
        price: 10,
      };
      setMenu(sampleMenu)(dispatch);
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.ORDER_SET_MENU,
        payload: sampleMenu,
      });
    });
  });
});
