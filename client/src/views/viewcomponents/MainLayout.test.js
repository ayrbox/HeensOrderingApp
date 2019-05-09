import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect';

import MainLayout from './Footer';

function renderWithRouter(
  ui, {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]})
  } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  }
}


describe('Main Layout', () => {
  afterEach(cleanup);

  it('MainLayout', () => {
    const mainLayout = renderWithRouter(<MainLayout />);
    expect(mainLayout).toMatchSnapshot();
  });
});
