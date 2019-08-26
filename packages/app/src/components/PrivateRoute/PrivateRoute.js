import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.isAuthenticated === true ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default PrivateRoute;
