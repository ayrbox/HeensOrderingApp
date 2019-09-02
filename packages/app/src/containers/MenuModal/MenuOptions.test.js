import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MenuOptions from './MenuOptions';

const sampleOptions = [{
  additionalCost: 1,
  id: '5d65b14b0090bc34b87133ff',
  description: 'Chilli Sauce',
}, {
  additionalCost: 0.5,
  id: '5d65b14b0090bc34b87133fe',
  description: 'Tomato Ketchup',
}];

const mockToggle = jest.fn();

describe('<MenuOptions />', () => {
  describe('when options given', () => {
    it('should render correct', () => {
      const {
        container,
        getByTestId,
        getAllByTestId,
      } = render(
        <MenuOptions
          options={sampleOptions}
          onToggleSelect={mockToggle}
        />,
      );

      getByTestId('menu-option-list');

      const items = getAllByTestId('menu-option-item');
      expect(items.length).toEqual(sampleOptions.length);

      items.forEach((item) => {
        fireEvent.click(item);
      });

      expect(mockToggle).toHaveBeenCalledTimes(sampleOptions.length);
      expect(container).toMatchSnapshot();
    });
  });
});
