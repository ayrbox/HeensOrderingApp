import axios from 'axios';
import reducer, { ACTIONS } from '.' ;

jest.mock('axios');

describe('AUTH: Actions', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
  });
});

describe('AUTH: Reducer', () => {
  describe('SET_USER', () => {
    describe('when user detail is available', () => {
      it('should return true and user details', () => {
        const sampleUser = {
          name: 'Test User',
          email: 'test@email.com',
        };
        const {
          isAuthenticated,
          user,
        } = reducer(undefined, {
          type: ACTIONS.SET_USER,
          payload: sampleUser, 
        });
        expect(isAuthenticated).toBe(true);
        expect(user).toEqual(sampleUser);
      });
    });

    describe('when user details is empty/undefined', () => {
      it('should return false with empty details', () => {
        const {
          isAuthenticated,
          user,
        } = reducer(undefined, {
          type: ACTIONS.SET_USER,
          payload: {},
        });

        expect(isAuthenticated).toBe(false);
        expect(user).toEqual({});
      });

      it('should return false with undefined', () => {
        const {
          isAuthenticated,
          user,
        } = reducer(undefined, {
          type: ACTIONS.SET_USER,
        });
        expect(isAuthenticated).toBe(false);
        expect(user).toBeUndefined();
      });
    });
  });

  describe('LOGOUT', () => {
    it('when logout', () => {
      const {
        isAuthenticated,
        user,
      } = reducer(undefined, {
        type: ACTIONS.LOGOUT,
      });
      expect(isAuthenticated).toBe(false);
      expect(user).toBeUndefined();
    });
  });
});
