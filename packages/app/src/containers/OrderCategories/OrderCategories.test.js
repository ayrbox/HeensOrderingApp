import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import mockAxios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import OrderCategories from './OrderCategories';
import { waitForElement } from '@testing-library/dom';

const sampleCategories = [{
  _id: '5b3dfd4116987b4e407f8652',
  name: 'Appetisers',
  description: 'Appetisers Menu',
}, {
  _id: '5b58ae049841684dcc644f43',
  name: 'Black Bean',
  description: 'Black Bean',
}, {
  _id: '5b58adf99841684dcc644f42',
  name: 'Beef',
  description: 'Beef Items',
}, {
  _id: '5b58ae0b9841684dcc644f44',
  name: 'Chicken',
  description: 'Chicken',
}, {
  _id: '5b58ae109841684dcc644f45',
  name: 'Curry',
  description: 'Curry',
}, {
  _id: '5b58ae1e9841684dcc644f47',
  name: 'Drinks',
  description: 'Drinks',
}, {
  _id: '5b58ae239841684dcc644f48',
  name: 'Duck',
  description: 'Duck',
}, {
  _id: '5b58ae169841684dcc644f46',
  name: 'Desert',
  description: 'Desert',
}];

jest.mock('axios');
const mockSetCategory = jest.fn();

describe('<OrderCategories />', () => {
  it('should render correctly', async () => {
    const testData = {
      data: sampleCategories,
    };

    mockAxios.get.mockResolvedValueOnce(testData);
    const { container, getByTestId, getAllByTestId } = render(
      <OrderCategories
        setCategory={mockSetCategory}
      />,
    );
    expect(getByTestId(/category-list/)).toHaveTextContent(/Loading/);

    const list = await waitForElement(() => getAllByTestId(/category-item/));

    expect(list.length).toEqual(sampleCategories.length + 1); // + All (default)
    list.forEach((item) => {
      fireEvent.click(item);
    });

    expect(mockSetCategory).toHaveBeenCalledTimes(sampleCategories.length + 1); // + All (default);
    expect(container).toMatchSnapshot();
  });
});
