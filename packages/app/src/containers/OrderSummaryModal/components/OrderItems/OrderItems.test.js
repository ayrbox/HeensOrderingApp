import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrderItems from './OrderItems';

const sampleOrderItems = [{
  _id: '10012318',
  name: 'Heen\'s Mixed Hors D\'oeuvres并',
  description: 'Mixed Hors D\'oeuvres (For 2 Persons or More)',
  price: 7.9,
  menuOptions: [
    {
      description: 'Chilli Sauce',
      additionalCost: 1
    },
  ],
  itemTotal: 8.9,
}, {
  _id: '2397492374',
  name: 'Mini Spring Rolls 春卷',
  description: 'Mini Spring Rolls (Vegetarian Available)',
  price: 4.9,
  menuOptions: [],
  itemTotal: 4.9,
}];
const subTotal = 13.8;
const discount = 0;
const orderTotal = 13.8;

describe('<OrderItem />', () => {
  it('should render correctly', () => {
    const {
      getByTestId,
      getAllByTestId,
    } = render(
      <OrderItems
        orderItems={sampleOrderItems}
        subTotal={subTotal}
        discount={discount}
        total={orderTotal}
      />,
    );

    expect(getByTestId('total')).toHaveTextContent(orderTotal);
    expect(getByTestId('discount')).toHaveTextContent(discount);
    expect(getByTestId('sub-total')).toHaveTextContent(subTotal);

    expect(getAllByTestId('order-item'))
      .toHaveLength(sampleOrderItems.length);
  });
});
