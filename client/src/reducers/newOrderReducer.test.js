import {
  ORDER_RESET,
  ORDER_OPEN_UI_PANE,
  ORDER_CLOSE_UI_PANE,
  ORDER_SET_TYPE,
  ORDER_SET_DELIVERY_ADDRESS,
  ORDER_SET_TABLE,
  ORDER_ADD_ITEM,
} from '../actions/types';
import reducer, { initialState } from './newOrderReducer';

describe('newOrderReducer', () => {
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
        menuOptions: [
          {
            description: 'Sauce',
            additionalCost: 0,
          },
        ],
      };
      const { orderItems } = reducer(void 0, {
        type: ORDER_ADD_ITEM,
        payload: sampleItem,
      });
      expect(orderItems).toContain(sampleItem);
    });
  });

  // describe('Remove menu item from order');
  // describe('Set discount percentage (%) on order');
  //
  // describe('Set order note');
  //
  // describe('Save order', () => {
  //   describe('when invalid order');
  //   describe('when not is not present');
  // });
});
