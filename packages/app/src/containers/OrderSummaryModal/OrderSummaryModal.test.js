import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrderSummaryModal from './OrderSummaryModal';

const sampleOrder = {
  requestInProgress: false,
  requestSuccess: false,
  openNewOrderPane: false,
  orderType: 'table',
  orderItems: [
    {
      _id: '23982A',
      name: 'Crispy Seaweed干貝',
      description: 'Crispy Seaweed',
      price: 4.9,
      menuOptions: [],
      itemTotal: 4.9,
    },
    {
      _id: '23982B',
      name: 'Sesame Prawn on Toast下多士',
      description: 'Sesame Prawn on Toast',
      price: 5.5,
      menuOptions: [],
      itemTotal: 5.5,
    },
    {
      _id: '23982C',
      name: 'Heen\'s Mixed Hors D\'oeuvres并',
      description: 'Mixed Hors D\'oeuvres (For 2 Persons or More)',
      price: 7.9,
      menuOptions: [],
      itemTotal: 7.9,
    },
    {
      _id: '23982D',
      name: 'Vegetarian Mini Spring Rolls齐卷',
      description: 'Vegetarian Mini Spring Rolls',
      price: 4.9,
      menuOptions: [],
      itemTotal: 4.9,
    },
  ],
  subTotal: 36,
  discount: 0,
  orderTotal: 36,
  note: '',
  openMenuModal: false,
  openSummary: true,
  status: 'ordered',
};


const mockProcessOrder = jest.fn();
const mockShowSummary = jest.fn();
const mockResetOrder = jest.fn();

describe('<OrderTable />', () => {
  afterEach(cleanup);

  it('renders correctly', async () => {
    const { container, getByTestId } = render(
      <Router>
        <OrderSummaryModal
          order={sampleOrder}
          setTable={jest.fn()}
          setDeliveryAddress={jest.fn()}
          setDiscount={jest.fn()}
          setStatus={jest.fn()}
          addNote={jest.fn()}
          processOrder={mockProcessOrder}
          showSummary={mockShowSummary}
          resetOrder={mockResetOrder}
        />
      </Router>,
    );

    // debug();

    fireEvent.click(getByTestId('close-order-button'));
    expect(mockShowSummary).toHaveBeenCalled();

    // triggers confirm modal and then triggers process func
    fireEvent.click(getByTestId('confirm-order-button'));
    const [, yesButton] = await waitForElement(() => [
      getByTestId(/confirm-modal/),
      getByTestId(/yes-button/),
    ]);
    fireEvent.click(yesButton);
    expect(mockProcessOrder).toHaveBeenCalled();


    // test snapshot for the component
    expect(container).toMatchSnapshot();
  });
});
