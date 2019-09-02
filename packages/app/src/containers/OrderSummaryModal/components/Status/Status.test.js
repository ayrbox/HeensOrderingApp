import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Status from './Status';
import { ORDER_STATUSES } from '../../../../constants';

describe('<Status />', () => {
  it('should render status with selectable options', async () => {
    const mockOnChange = jest.fn();

    const {
      getByTestId,
      getAllByTestId,
      getByRole,
      getByText,
    } = render(
      <Status
        status={ORDER_STATUSES.ordered}
        onChange={mockOnChange}
      />,
    );
    getByTestId('status-dropdown');

    // Open options
    const selectButton = getByRole('button');
    fireEvent.click(selectButton);

    // Assert options are renderd
    const items = await waitForElement(() => getAllByTestId('status-dropdown-item'));
    expect(items).toHaveLength(Object.keys(ORDER_STATUSES).length);

    // Assert get by rendered
    const paidItem = getByText(ORDER_STATUSES.paid);
    fireEvent.click(paidItem);

    expect(mockOnChange).toHaveBeenCalledWith('paid');
  });
});
