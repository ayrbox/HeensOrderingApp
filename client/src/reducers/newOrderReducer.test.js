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
} from '../actions/types';
import reducer, { initialState } from './newOrderReducer';

describe('REDUCER: newOrderReducer', () => {
  it('should return initial state', () => {
    const state = reducer(void 0, {
      type: undefined,
      payload: undefined,
    });
    expect(state).toEqual(initialState);
  });

  describe('Reset new order', () => {
    it('should return inital state', () => {
      const state = reducer(void 0, { type: ORDER_RESET });
      expect(state).toEqual(initialState);
    });
  });

  describe('when open and closing Order UI Pane', () => {
    it('should return state with open pane', () => {
      const result = reducer(void 0, {
        type: ORDER_OPEN_UI_PANE
      });
      expect(result.openNewOrderPane).toBe(true);
    });

    it('should return state with close pane', () => {
      const result = reducer(void 0, {
        type: ORDER_CLOSE_UI_PANE
      });
      expect(result.openNewOrderPane).toBe(false);
    })
  });

  describe('setting order type', () => {
    describe('when order type is Collection', () => {
      it('should return orderType collection', () => {
        const state = reducer(void 0, {
          type: ORDER_SET_TYPE,
          payload: 'collection',
        });
        expect(state.orderType).toEqual('collection');
      });
    });
    describe('when order type is Delivery', () => {
      it('should return orderType delivery', () => {
        const state = reducer(void 0, {
          type: ORDER_SET_TYPE,
          payload: 'delivery',
        });
        expect(state.orderType).toEqual('delivery');
      })
    });
    describe('when setting order type as Eat In', () => {
      it('should return orderType eat-in', () => {
        const state = reducer(void 0, {
          type: ORDER_SET_TYPE,
          payload: 'eat-in',
        });
        expect(state.orderType).toEqual('eat-in');
      });
    });
  });

  describe('Set delivery address', () => {
    it('should set delivery address', () => {
      const sampleAddress = {
        name: 'Micheal',
        contactNo: '0208552837',
        address: '100 London Road',
        postCode: 'WC1 1AX',
      };
      const { deliveryAddress } = reducer({
        orderType: 'delivery',
      }, {
          type: ORDER_SET_DELIVERY_ADDRESS,
          payload: sampleAddress,
      });
      expect(deliveryAddress).toEqual(sampleAddress);
    });

    it('should not set delivery address', () => {
      const testAddress = {
        name: 'Test Customer',
        contactNo: '20328302',
        address: 'Test Road',
        postCode: 'AB12 9XY',
      };
      const { deliveryAddress } = reducer({
        orderType: 'collection'
      }, {
        type: ORDER_SET_DELIVERY_ADDRESS,
        payload: testAddress,
      });
      expect(deliveryAddress).toBeUndefined();
    })
  });

  describe('Set table number', () => {
    describe('when order type is eat-in', () => {
      it('should set table number', () => {
        const sampleTableNo = 'TBL001';
        const { tableNo } = reducer({
          orderType: 'eat-in',
        }, {
          type: ORDER_SET_TABLE,
          payload: sampleTableNo
        });
        expect(tableNo).toEqual(sampleTableNo);
      });
    });

    describe('when order type is not eat-in', () => {
      it('should not set table number', () => {
        const sampleTableNo = 'TBL100';
        const { tableNo } = reducer({ orderType: 'delivery' }, {
          type: ORDER_SET_TYPE,
          payload: sampleTableNo,
        });
        expect(tableNo).toBeUndefined();
      });
    });
  });

  describe('Add new menu item on order', () => {
    it('should return empty array', () => {
      const { orderItems } = reducer(void 0, { type: undefined });
      expect(orderItems.length).toBe(0);
    });

    it('should add item', () => {
      const sampleItem = {
        name: 'Menu Item',
        description: 'Menu Description',
        price: 10,
        menuOptions: [{
          description: 'Sauce',
          additionalCost: 0,
        }, {
          description: 'New Sauce',
          additionalCost: 0.5,
        }],
        itemTotal: 10.5,
      };
      const {
        orderItems,
        subTotal,
        selectedMenu,
        openMenuModal,
      } = reducer(undefined, {
        type: ORDER_ADD_ITEM,
        payload: sampleItem,
      });
      expect(orderItems).toContain(sampleItem);
      expect(subTotal).toBe(10.5);
      expect(selectedMenu).toBeUndefined();
      expect(openMenuModal).toBe(false);
    });
  });

  describe('Remove menu item from order', () => {
    it('should return indexed menu item', () => {
      const sampleItems = [
        { name: 'Item 1', description: 'Test Item 1', price: 10, itemTotal: 10 },
        { name: 'Item 2', description: 'Test Item 2', price: 20, itemTotal: 20 },
        { name: 'Item 3', description: 'Test Item 3', price: 30, itemTotal: 30 },
        { name: 'Item 4', description: 'Test Item 4', price: 40, itemTotal: 40 },
      ];

      const state = {
        orderItems: sampleItems,
        subTotal: 100,
      };


      const expected = [
        { name: 'Item 2', description: 'Test Item 2', price: 20 },
      ];
      const { orderItems, subTotal } = reducer(state, {
        type: ORDER_REMOVE_ITEM,
        payload: 1,
      });
      expect(orderItems).toEqual(
        expect.not.arrayContaining(expected),
      );
      expect(subTotal).toBe(80);
    });
  });

  describe('Set discount percentage (%) on order', () => {
    it('should set discount percentage', () => {
      const { discount } = reducer(void 0, {
        type: ORDER_SET_DISCOUNT,
        payload: 10,
      });
      expect(discount).toBe(10);
    });

    it('should set discount and calculate order total', () => {
      const state = { subTotal: 400, orderTotal: 400 }
      const { discount, orderTotal } = reducer(state, {
        type: ORDER_SET_DISCOUNT,
        payload: 20,
      });
      expect(discount).toBe(20);
      expect(orderTotal).toBe(320);
    })
  });

  describe('Set order note', () => {
    it('should add note to order', () => {
      const { note } = reducer(void 0, {
        type: ORDER_ADD_NOTE,
        payload: 'Sample Order Note.'
      });
      expect(note).toEqual('Sample Order Note.')
    });
  });

  describe('Set category', () => {
    describe('when setting category', () => {
      it('should set category Id', () => {
        const { categoryId } = reducer(undefined, {
          type: ORDER_SET_CATEGORY,
          payload: {
            categoryId: 'categoryId-293742938',
          },
        });
        expect(categoryId).toEqual('categoryId-293742938');
      });
    });

    describe('when setting category to undefined/null', () => {
      it('should set category Id to all i.e undefind or empty string', () => {
        const { categoryId } = reducer(undefined, {
          type: ORDER_SET_CATEGORY,
          payload: {
            categoryId: '',
          },
        });
        expect(categoryId).toEqual('');
      });
    });
  });

  describe('setMenu', () => {
    it('should set menu Id and openModal', () => {
      const sampleMenu = {
        name: 'Test',
        description: 'Test Menu Item',
        price: 10,
      };

      const { selectedMenu, openMenuModal } = reducer(undefined, {
        type: ORDER_SET_MENU,
        payload: {
          menuId: sampleMenu,
        },
      });
      expect(selectedMenu).toEqual(sampleMenu);
      expect(openMenuModal).toBe(true);
    });
  });

  describe('order process', () => {
    describe('when order process requested', () => {
      const {
        requestInProgress,
        requestSuccess,
      } = reducer(void 0, {
        type: ORDER_PROCESS_REQUEST,
      });

      expect(requestInProgress).toBe(true);
      expect(requestSuccess).toBe(false);
    });

    describe('when order process failed', () => {
      const {
        requestInProgress,
        requestSuccess,
      } = reducer(void 0, {
        type: ORDER_PROCESS_FAILED,
        payload: {
          error: 'Unable process order',
        },
      });
      expect(requestInProgress).toBe(false);
      expect(requestSuccess).toBe(false);
    })

    describe('when order process is successful', () => {
      const {
        requestInProgress,
        requestSuccess,
      } = reducer(void 0, {
        type: ORDER_PROCESS_SUCCESS,
      });
      expect(requestInProgress).toBe(false);
      expect(requestSuccess).toBe(true)
    });
  });
});
