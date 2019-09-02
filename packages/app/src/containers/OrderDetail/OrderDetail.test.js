import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ORDER_TYPES } from '../../constants';
import OrderDetail from './OrderDetail';


const sampleOrder = {
  requestInProgress: false,
  requestSuccess: false,
  openNewOrderPane: false,
  orderType: 'table',
  orderItems: [{
    name: 'Heen\'s Mixed Hors D\'oeuvres并',
    description: 'Mixed Hors D\'oeuvres (For 2 Persons or More)',
    price: 7.9,
    menuOptions: [{
      description: 'Chilli Sauce',
      additionalCost: 1,
    }],
    itemTotal: 8.9,
  }, {
    name: 'Wor Tip Pan Fried Pork Dumplings 鍋貼',
    description: 'Wor Tip Pan Fried Pork Dumplings (4 Pieces)',
    price: 5.5,
    menuOptions: [],
    itemTotal: 5.5,
  }, {
    name: 'Satay Chicken 串雞',
    description: 'Satay Chicken with Peanut Sauce on Skewers (4 Pieces)',
    price: 6,
    menuOptions: [],
    itemTotal: 6,
  }],
  subTotal: 20.4,
  discount: 0,
  orderTotal: 20.4,
  note: '',
  openMenuModal: false,
  openSummary: false,
  status: 'ordered',
};


describe('<OrderDetail />', () => {
  it('should render correctly', () => {
    const mockShowSummary = jest.fn();
    const {
      container,
      getByTestId,
      getAllByTestId,
    } = render(
      <OrderDetail
        newOrder={sampleOrder}
        showSummary={mockShowSummary}
      />,
    );

    expect(getByTestId(/title/)).toHaveTextContent(/Order Details/);
    expect(getByTestId(/order-type/))
      .toHaveTextContent(ORDER_TYPES[sampleOrder.orderType]);

    getByTestId('item-list');
    const items = getAllByTestId('order-item');
    expect(items).toHaveLength(sampleOrder.orderItems.length);

    const options = getAllByTestId('order-item-option');
    expect(options).toHaveLength(1);
    expect(getByTestId('order-total')).toHaveTextContent('20.4');

    fireEvent.click(getByTestId('button-process'));

    expect(mockShowSummary).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
