import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const PageContext = React.createContext();

export class PageProvider extends Component {
  state = {
    requestInProgress: false
  }

  handleEdit = (id) => {
    console.log('Handle edit', id);
    this.setState({
      requestInProgress: true,
    });
  }

  handleDelete = (id) => {
    console.log('Handle delete', id);
    this.setState({
      requestInProgress: true,
    });
  }

  render() {
    const { children } = this.props;
    const { requestInProgress } = this.props;

    return (
      <PageContext.Provider value={{
        requestInProgress,
        handleDelete: this.handleDelete,
        handleEdit: this.handleEdit,
      }}
      >
        {children}
      </PageContext.Provider>
    );
  }
}


PageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
