import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MenuModal from './MenuModal';

const mockAddItem = jest.fn();
const mockReset = jest.fn();

const sampleMenu = {
  tags: ['Wheat', 'Crustaceans', 'Egg', 'Fish', 'Peanuts', 'Sesame'],
  _id: '5d631866c5799434e5c1ac4d',
  name: 'Heen\'s Mixed Hors D\'oeuvres并',
  description: 'Mixed Hors D\'oeuvres (For 2 Persons or More)',
  price: 7.9,
  category: {
    _id: '5b3dfd4116987b4e407f8652',
    name: 'Appetisers',
    description: 'Appetisers Menu',
  },
  menuOptions: [],
};

describe('<MenuModal />', () => {
  describe('when open is false', () => {
    it('should not renders dialog', () => {
      const { container, queryByTestId } = render(
        <MenuModal
          addOrderItem={mockAddItem}
          resetOrder={mockReset}
          open={false}
          menu={sampleMenu}
        />,
      );
      expect(queryByTestId('menu-dialog')).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  describe('when open is true', () => {
    it('should render dialog correctly', () => {
      const { container, getByTestId } = render(
        <MenuModal
          addOrderItem={mockAddItem}
          resetOrder={mockReset}
          open
          menu={sampleMenu}
        />,
      );
      getByTestId('menu-dialog');
      expect(getByTestId('menu-name')).toHaveTextContent(sampleMenu.name);
      expect(getByTestId('menu-description')).toHaveTextContent(sampleMenu.description);
      expect(getByTestId('menu-price')).toHaveTextContent(sampleMenu.price);

      fireEvent.click(getByTestId(/button-select/));
      expect(mockAddItem).toHaveBeenCalled(); // can be assert with `toHaveBeenCalledWith`

      fireEvent.click(getByTestId(/button-cancel/));
      expect(mockReset).toHaveBeenCalled();

      expect(container).toMatchSnapshot();
    });
  });
});
