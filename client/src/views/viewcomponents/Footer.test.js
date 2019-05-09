import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect';

import Footer from './Footer';



// this is a handy function that I would utilize for any component
// that relies on the router being in context
// TODO: move to tiles for testing 
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


describe('Footer', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const copyrightContainer = getByTestId('copyright-text')
    expect(copyrightContainer).toHaveTextContent('2019 MIT License')
    getByTestId('back-to-top');
  });
});
