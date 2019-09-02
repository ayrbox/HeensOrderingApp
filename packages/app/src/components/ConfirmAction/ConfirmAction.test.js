import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ConfirmAction from './ConfirmAction';


describe('<ConfirmationAction/> spec', () => {
  const mockAction = jest.fn();
  const confirmMessage = 'Please confirm action or cancel';
  let container;

  beforeEach(() => {
    container = render(
      <ConfirmAction
        message={confirmMessage}
        action={mockAction}
      >
        <button type="button">ClickMe</button>
      </ConfirmAction>,
    );
  });

  afterEach(() => {
    mockAction.mockClear();
    cleanup();
  });

  it('renders the component', () => {
    expect(container).toMatchSnapshot();
  });

  it('clicking a button displays modal and click yes button', async () => {
    const { getByText, getByTestId } = container;
    const button = getByText('ClickMe');
    fireEvent.click(button);
    await waitForElement(() => getByTestId(/confirm-modal/));

    fireEvent.click(getByTestId(/yes-button/));
    expect(mockAction).toHaveBeenCalled();
  });

  it('clicking a button displays modal and click no button', async () => {
    const { getByText, getByTestId } = container;
    const button = getByText('ClickMe');
    fireEvent.click(button);
    await waitForElement(() => getByTestId(/confirm-modal/));
    fireEvent.click(getByTestId(/no-button/));
  });
});
