import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import PageProvider, { ACTIONS, usePageState, initialState } from '.';
import '@testing-library/jest-dom/extend-expect';

const TestConsumer = () => {
  const [state, dispatch] = usePageState();

  const handleSave = () => {
    dispatch({ type: ACTIONS.SAVING });
    setTimeout(() => {
      dispatch({ type: ACTIONS.SAVED });
    }, 200);
  };
  return (
    <>
      <div data-testid="state">{JSON.stringify(state)}</div>
      <button
        type="button"
        data-testid="addButton"
        onClick={() => dispatch({ type: ACTIONS.ADD })}
      >
        Add
      </button>
      <button
        type="button"
        data-testid="saveButton"
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
};

const makeConsumer = () => render(
  <PageProvider>
    <TestConsumer />
  </PageProvider>,
);

afterEach(cleanup);

describe('<PageProvider />', () => {
  it('should have default state', () => {
    const { getByTestId } = makeConsumer();
    const state = getByTestId('state');
    expect(state).toHaveTextContent(JSON.stringify(initialState));
  });

  describe('when add action is trigger', () => {
    it('should change open state to true', () => {
      const { getByTestId } = makeConsumer();
      fireEvent.click(getByTestId('saveButton'));
      const state = getByTestId('state');
      expect(state).toHaveTextContent(JSON.stringify({
        ...initialState,
        requestInProgress: true,
      }));

      // TODO: test if requestInProcess change back to false after 1s
    });
  });

  // describe('when edit action is triggered', () => {
  //   it('should contain edit state');
  // });

  // describe('when delete action is triggered', () => {
  //   it('should contain delete state');
  // });

  // describe('when saving and save action is triggred', () => {
  //   it('should change saving state to true');
  //   it('should change saving state to false');
  // });


  // describe('when error is trigerred', () => {
  //   it('should contain error in state');
  //   it('should display error snackbar');
  // });

  // describe('when fetching and fetched action is triggred', () => {
  //   it('should change loading state to true');
  //   it('should change loading state to false');
  // });
});
