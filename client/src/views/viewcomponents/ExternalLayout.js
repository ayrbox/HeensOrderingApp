import React from 'react';
import PropTypes from 'prop-types';

const ExternalLayout = ({ children }) => (
  <div className="app-container">{children}</div>
);

ExternalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLayout;
