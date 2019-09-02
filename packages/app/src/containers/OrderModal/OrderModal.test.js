import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrderModal from './OrderModal';

const mockCloseOrderPane = jest.fn();
const mockSetOrderType = jest.fn();


const makeOrderModal = () => render(
  <Router>
    <OrderModal
      isOpenOrderModal
      closeOrderPane={mockCloseOrderPane}
      setOrderType={mockSetOrderType}
    />
  </Router>,
);

describe('<OrderModal />', () => {
  afterEach(() => {
    mockCloseOrderPane.mockClear();
    mockSetOrderType.mockClear();
    cleanup();
  });

  describe('when close buttin is clicked', () => {
    it('should trigger close func', () => {
      const { getByTestId } = makeOrderModal();
      getByTestId('order-drawer');

      fireEvent.click(getByTestId(/button-close/));
      expect(mockCloseOrderPane).toHaveBeenCalled();
    });
  });

  describe('when eat-in button is clicked', () => {
    it('should trigger set order and close', () => {
      const {
        container,
        getByTestId,
      } = makeOrderModal();
      getByTestId('order-drawer');

      // Eat In button triggers set order and close
      fireEvent.click(getByTestId('button-eatin'));
      expect(mockSetOrderType).toHaveBeenCalledWith('table');
      expect(mockCloseOrderPane).toHaveBeenCalled();

      expect(container).toMatchSnapshot();
    });
  });

  describe('when takeaway button is clicked', () => {
    it('should reveal delivery and collection button', async () => {
      const { container, getByTestId } = makeOrderModal();
      getByTestId(/order-drawer/);

      // Takeway button triggers next step
      fireEvent.click(getByTestId(/button-takeaway/));
      await waitForElement(() => [
        getByTestId(/button-delivery/),
        getByTestId(/button-collection/),
        getByTestId(/button-back/),
      ]);
      expect(container).toMatchSnapshot();
    });
  });


  describe('when delivery/collection buttons clicked', () => {
    it('should trigger set order with delivery', async () => {
      const { getByTestId } = makeOrderModal();
      fireEvent.click(getByTestId(/button-takeaway/));

      const btnDelivery = await waitForElement(() => getByTestId(/button-delivery/));

      fireEvent.click(btnDelivery);
      expect(mockSetOrderType).toHaveBeenCalledWith('delivery');
      expect(mockCloseOrderPane).toHaveBeenCalled();
    });

    it('should trigger set order with collection', async () => {
      const { getByTestId } = makeOrderModal();
      fireEvent.click(getByTestId(/button-takeaway/));

      const btnCollection = await waitForElement(() => getByTestId(/button-collection/));

      fireEvent.click(btnCollection);
      expect(mockSetOrderType).toHaveBeenCalledWith('collection');
      expect(mockCloseOrderPane).toHaveBeenCalled();
    });

    it('should trigger screen back to previous', async () => {
      const { getByTestId } = makeOrderModal();
      fireEvent.click(getByTestId(/button-takeaway/));

      const btnBack = await waitForElement(() => getByTestId(/button-back/));

      fireEvent.click(btnBack);
      await waitForElement(() => [
        getByTestId(/button-eatin/),
        getByTestId(/button-takeaway/),
      ]);
    });
  });
});
