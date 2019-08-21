import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import PageProvider, { ACTIONS, usePageState, initialState } from '.';

const TestConsumer = () => {
  const [state, dispatch] = usePageState();

  const handleSave = () => {
    dispatch({ type: ACTIONS.SAVING });
    setTimeout(() => {
      dispatch({ type: ACTIONS.SAVED });
    }, 1000);
  };
  return (
    <>
      <div data-testid="state-data">{JSON.stringify(state)}</div>
      <button
        type="button"
        data-testid="addButton"
        onClick={() => dispatch({ type: ACTIONS.ADD })}
      >
        Add
      </button>
      <button
        type="button"
        data-testid="btnSave"
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
  </PageProvider>
);

afterEach(cleanup);

describe('<PageProvider />', () => {
  it('should have default state', () => {
    const { debug, getByTestId } = makeConsumer();
    debug();
    fireEvent.click(getByTestId('btnSave'));
    debug();
  });

  describe('when add action is trigger', () => {
    const { debug, getByTestId } = makeConsumer();
    fireEvent.click(getByTestId('addButton'));

    it('should change open state to true', () => {
      debug();
      const s = getByTestId('state-data');
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
