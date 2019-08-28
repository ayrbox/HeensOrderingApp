import React from 'react';
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import mockAxios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import OrderMenus from './OrderMenus';

const sampleMenus = [{
  _id: '23472937429749283',
  name: 'Menu Item 1',
  category: {
    _id: 'category001',
    name: 'Category 001',
  },
  description: 'Sample menu item 1',
  price: 7.99,
}, {
  _id: '20398420393',
  name: 'Menu Item 2',
  category: {
    _id: 'category001',
    name: 'Category 001',
  },
  description: 'Sample menu item 2',
  price: 9.99,
}, {
  _id: '0953084',
  name: 'Menu Item 3',
  category: {
    _id: 'category002',
    name: 'Category 002',
  },
  description: 'Sample menu item 3',
  price: 20.99,
}];

jest.mock('axios');

const mockSetMenu = jest.fn();

describe('<OrderMenus />', () => {

  afterEach(cleanup);

  it('should render correctly all menu items', async () => {
    const testData = {
      data: sampleMenus,
    };
    mockAxios.get.mockResolvedValueOnce(testData);

    const {
      container,
      getByTestId,
      getAllByTestId,
    } = render(
      <OrderMenus
        setMenu={mockSetMenu}
      />,
    );

    expect(getByTestId('order-menu-list')).toHaveTextContent(/Loading/);
    const menus = await waitForElement(() => getAllByTestId(/order-menu-item/));
    expect(menus).toHaveLength(sampleMenus.length);

    expect(container).toMatchSnapshot();
  });

  it('should render menu items for selected cateogry', async () => {
    const testData = {
      data: sampleMenus,
    };
    mockAxios.get.mockResolvedValueOnce(testData);

    const categoryId = 'category001';

    const {
      container,
      getByTestId,
      getAllByTestId,
    } = render(
      <OrderMenus
        setMenu={mockSetMenu}
        category={categoryId}
      />,
    );

    expect(getByTestId('order-menu-list')).toHaveTextContent(/Loading/);
    const menus = await waitForElement(() => getAllByTestId(/order-menu-item/));

    const menusForCategory = sampleMenus
      .filter(({ category: { _id: id } }) => id === categoryId);
    
    expect(menus).toHaveLength(menusForCategory.length);

    menus.forEach(m => fireEvent.click(m));
    expect(mockSetMenu).toHaveBeenCalledTimes(menus.length);

    expect(container).toMatchSnapshot();


  });
});
