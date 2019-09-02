import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrderTable from './OrderTable';

describe('<OrderTable />', () => {
  afterEach(cleanup);

  it('should not render if not table', () => {
    const { container } = render(
      <OrderTable
        type="delivery"
        tableNo="100"
        onChange={jest.fn()}
      />,
    );
    expect(container).toBeEmpty();
  });

  it('should render with textbox input', () => {
    const mockOnChange = jest.fn();
    const {
      getByTestId,
    } = render(
      <OrderTable
        type="table"
        tableNo="100"
        onChange={mockOnChange}
      />,
    );
    expect(getByTestId('label-order-type')).toHaveTextContent('Table');

    const tableNo = getByTestId('table-no-input');
    expect(tableNo.value).toEqual('100');

    fireEvent.change(tableNo, { target: { value: '20' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
