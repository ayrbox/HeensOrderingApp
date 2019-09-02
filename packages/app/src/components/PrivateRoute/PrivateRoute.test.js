import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import PrivateRoute from './PrivateRoute';

const makeTestRoute = auth => render(
  <Router>
    <>
      <PrivateRoute
        exact
        path="/"
        auth={auth}
        component={() => <div data-testid="hello">hello world</div>}
      />
      <Route
        exact
        path="/login"
        component={() => <div data-testid="login">login</div>}
      />
    </>
  </Router>,
);

describe('<PrivateRoute />', () => {
  afterEach(cleanup);

  describe('when not authenticated', () => {
    it('should render login route', () => {
      const { getByTestId } = makeTestRoute({
        isAuthenticated: false,
      });
      getByTestId(/login/); // redirects to login
    });
  });

  describe('when authenticated', () => {
    it('should render `/` route', () => {
      const { getByTestId } = makeTestRoute({
        isAuthenticated: true,
      });

      // Note: don't know why but initially it renders twice
      waitForElement(() => getByTestId(/hello/));
    });
  });
});
