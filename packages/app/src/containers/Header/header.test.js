import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './header';

describe('<Header /> spec', () => {
  const mockOpen = jest.fn();
  let container;

  beforeEach(() => {
    container = render(
      <Router>
        <Header
          title="TestTitle"
          openOrderPane={mockOpen}
        />
      </Router>,
    );
  });

  afterEach(() => {
    mockOpen.mockClear();
    cleanup();
  });

  it('renders the component', () => {
    expect(container).toMatchSnapshot();
  });

  it('renders header with given title', () => {
    const { getByTestId } = container;
    const headerTitle = getByTestId('title');
    expect(headerTitle).toHaveTextContent(/TestTitle/);
  });

  it('should call open method on new order button click', () => {
    const { getByTestId } = container;
    fireEvent.click(getByTestId('new-order-button'));
    expect(mockOpen).toHaveBeenCalled();
  });
});
