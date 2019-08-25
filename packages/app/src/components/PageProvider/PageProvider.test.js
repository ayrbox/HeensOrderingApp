import React from 'react';
import PropTypes from 'prop-types';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import PageProvider, { ACTIONS, usePageState, initialState } from '.';
import '@testing-library/jest-dom/extend-expect';
// import { waitForElement } from '@testing-library/dom';

const TestConsumer = ({ dispatchAction }) => {
  const [state, dispatch] = usePageState();

  const handleDispatch = () => {
    dispatch(dispatchAction);
  };

  return (
    <>
      <div data-testid="state">{JSON.stringify(state)}</div>
      <button
        type="button"
        data-testid="buttonDispatcher"
        onClick={handleDispatch}
      >
        Dispatcher
      </button>
    </>
  );
};

TestConsumer.propTypes = {
  dispatchAction: PropTypes.shape().isRequired,
};

const makeConsumer = action => render(
  <PageProvider>
    <TestConsumer dispatchAction={action} />
  </PageProvider>,
);

afterEach(cleanup);

describe('<PageProvider />', () => {
  it('should have default state', () => {
    const { getByTestId } = makeConsumer({});
    const state = getByTestId('state');
    expect(state).toHaveTextContent(JSON.stringify(initialState));
  });

  describe('when add action is trigger', () => {
    it('should change open state to true', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.ADD,
      });
      fireEvent.click(getByTestId('buttonDispatcher'));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        id: null,
        open: true,
      };
      expect(state.textContent).toEqual(JSON.stringify(expectedState));
    });
  });

  describe('when edit action is triggered', () => {
    it('should contain edit state', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.EDIT,
        payload: {
          id: 'TEST-ID-001',
        },
      });

      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        id: 'TEST-ID-001',
        open: true,
      };

      expect(state).toHaveTextContent(JSON.stringify(expectedState));
    });
  });

  describe('when delete action is triggered', () => {
    it('should change state to delete', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.DELETING,
      });
      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        requestInProgress: true,
        errors: {},
      };
      expect(state).toHaveTextContent(JSON.stringify(expectedState));
    });

    it('should contain delete state', async () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.DELETED,
        payload: 'Something deleted',
      });

      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        id: null,
        open: false,
        requestInProgress: false,
        loading: false,
        message: 'Something deleted',
      };
      expect(state).toHaveTextContent(JSON.stringify(expectedState));

      await waitForElement(() => getByTestId(/snack-message/));
    });
  });

  describe('when saving and save action is triggred', () => {
    it('should change saving state to true', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.SAVING,
      });
      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        requestInProgress: true,
      };
      expect(state).toHaveTextContent(JSON.stringify(expectedState));
    });

    it('should change saving state to false', async () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.SAVED,
        payload: 'Saved something',
      });
      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expectedState = {
        ...initialState,
        id: null,
        requestInProgress: false,
        loading: false,
        open: false,
        errors: {},
        message: 'Saved something',
      };
      expect(state).toHaveTextContent(JSON.stringify(expectedState));

      await waitForElement(() => getByTestId(/snack-message/));
    });
  });


  describe('when error is trigerred', () => {
    it('should contain error in state', async () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.ERROR,
        payload: {
          something: 'is required',
        },
      });

      fireEvent.click(getByTestId(/buttonDispatcher/));
      const state = getByTestId(/state/);
      const expected = {
        ...initialState,
        requestInProgress: false,
        loading: false,
        errors: {
          something: 'is required',
        },
      };

      expect(state).toHaveTextContent(JSON.stringify(expected));
      await waitForElement(() => getByTestId(/error-message/));
    });
  });

  describe('when fetching and fetched action is triggred', () => {
    it('should change loading state to true', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.FETCHING,
      });
      fireEvent.click(getByTestId(/buttonDispatcher/));
      const expected = {
        ...initialState,
        loading: true,
        errors: {},
      };
      const state = getByTestId(/state/);
      expect(state).toHaveTextContent(JSON.stringify(expected));
    });

    it('should change loading state to false', () => {
      const { getByTestId } = makeConsumer({
        type: ACTIONS.FETCHED,
        payload: 'ANY DATA IN PAYLOAD',
      });

      fireEvent.click(getByTestId(/buttonDispatcher/));
      const expected = {
        ...initialState,
        loading: false,
        requestInProgress: false,
        errors: {},
        data: 'ANY DATA IN PAYLOAD',
      };

      const state = getByTestId(/state/);
      expect(state).toHaveTextContent(JSON.stringify(expected));
    });
  });
});
