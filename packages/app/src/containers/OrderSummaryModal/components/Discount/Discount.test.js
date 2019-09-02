import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Discount from './Discount';
import { DISCOUNT_PERCENTAGES } from '../../../../constants';

describe('<Discount />', () => {
  it('should render correctly', () => {
    const mockOnChange = jest.fn();

    const {
      getByTestId,
      getByRole,
      getAllByTestId,
    } = render(
      <Discount discount={10} onChange={mockOnChange} />,
    );

    getByTestId('discount-dropdown');
    const discountSelect = getByRole('button');
    fireEvent.click(discountSelect);

    const discountItems = getAllByTestId('discount-item');
    expect(discountItems).toHaveLength(DISCOUNT_PERCENTAGES.length);

    const sampleDiscount = 20;
    const discountRegEx = new RegExp(`${sampleDiscount}%`);

    const discountItem = discountItems.find(item => item.textContent.match(discountRegEx));
    fireEvent.click(discountItem);
    expect(mockOnChange).toHaveBeenCalledWith(sampleDiscount);
  });
});
