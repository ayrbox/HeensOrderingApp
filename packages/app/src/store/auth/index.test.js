import axios from 'axios';
import reducer, {
  ACTIONS,
  logoutUser,
  loginUser,
} from '.';

jest.mock('axios');
const mockHistory = {
  push: jest.fn(),
};

describe('AUTH: Actions', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  describe('loginUser', () => {
    const sampleLogin = {
      email: 'test@example.com',
      password: 'testPass',
    };

    describe('when user logins successfully', () => {
      it('should dispatch action type SET_USER', async () => {
        const userDetail = {
          name: 'Test User',
          email: sampleLogin.email,
          iat: 1516239022,
        };
        axios.post.mockResolvedValueOnce({
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.tyZjnHQdycY1ee0FAeMmJ4G8yGcHQi5rZHfVQ4I1XuM',
          },
        });
        await loginUser(sampleLogin, mockHistory)(dispatch);
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.SET_USER,
          payload: userDetail,
        });

        expect(mockHistory.push).toBeCalledWith('/orders');
      });

      it('should dispatch action type LOGIN_ERROR', async () => {
        const errResponse = 'Failed login';
        axios.post.mockRejectedValue({
          response: {
            data: errResponse,
          },
        });
        await loginUser(sampleLogin, mockHistory)(dispatch);
        expect(dispatch).toBeCalledWith({
          type: ACTIONS.GET_ERRORS,
          payload: errResponse,
        });
      });
    });
  });

  describe('logoutUser', () => {
    it('should dispatch action type LOGOUT', () => {
      logoutUser()(dispatch);
      // TODO: test setToken method call
      // TODO: test localStorage method call
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.LOGOUT,
      });
    });
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
