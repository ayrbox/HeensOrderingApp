import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }) => (
  <div className="app-container">
    <Header title="Heens" />
    {children}
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
