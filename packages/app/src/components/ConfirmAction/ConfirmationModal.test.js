import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  getNodeText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ConfirmationModal from './ConfirmationModal';

describe('<ConfirmationModal />', () => {
  let container;
  const mockAction = jest.fn();
  const mockCancel = jest.fn();
  const modalText = 'Sample modal text';

  beforeEach(() => {
    container = render(
      <ConfirmationModal
        open
        action={mockAction}
        onCancel={mockCancel}
        text={modalText}
      />,
    );
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('contains all components', () => {
    const { getByTestId } = container;
    getByTestId(/confirm-modal/);
    getByTestId(/no-button/);
    getByTestId(/yes-button/);
    const message = getByTestId(/message-label/);
    expect(getNodeText(message)).toEqual(modalText);
  });

  it('clicks on yes button', () => {
    const { getByTestId } = container;
    fireEvent.click(
      getByTestId(/no-button/),
    );
    expect(mockCancel).toHaveBeenCalled();
  });

  it('click on no button', () => {
    const { getByTestId } = container;
    fireEvent.click(
      getByTestId(/yes-button/),
    );
    expect(mockAction).toHaveBeenCalled();
  });
});
