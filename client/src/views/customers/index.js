import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import { fetchCustomers, clearCustomers } from '../../actions/customerActions';
import styles from './styles';

import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';

class CustomerIndex extends Component {
  componentDidMount() {
    const { fetchCustomers: handleFetchCustomers } = this.props;
    handleFetchCustomers();
  }

  componentWillUnmount() {
    const { clearCustomers: handleClearCustomers } = this.props;
    handleClearCustomers();
  }

  render() {
    const {
      customers: { loading, list },
      classes,
      history,
    } = this.props;

    let pageContent;

    if (loading || list.length === 0) {
      pageContent = <Spinner />;
    } else {
      pageContent = (
        <DataTable
          data={list}
          columns={[
            {
              name: '_id',
              label: 'CustomerId',
              key: true,
              hidden: true,
            },
            {
              name: 'name',
              label: 'Name',
            },
            {
              name: 'phoneNo',
              label: 'Contact Number',
            }, {
              name: 'address',
              label: 'Address',
            }, {
              name: 'postCode',
              label: 'Post Code',
            },
          ]}
          onEdit={customerId => history.push(`/customers/${customerId}`)}
          onDelete={customerId => history.push(`/customers/${customerId}`)}
        />
      );
    }
    return (
      <MainLayout>
        <div className={classes.contentWrapper}>
          <PageHeader
            title="Customers"
            subTitle="List of customers"
            addButtonLink={{
              pathname: '/customers/add',
              state: { modal: true },
            }}
          />
          <div className="container">
            {pageContent}
          </div>
        </div>
      </MainLayout>
    );
  }
}

CustomerIndex.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    loading: PropTypes.bool,
    list: PropTypes.arrayOf({
      _id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      postCode: PropTypes.string,
    }),
    errors: PropTypes.shape(),
  })).isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  clearCustomers: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers,
});

export default connect(
  mapStateToProps, {
    fetchCustomers,
    clearCustomers,
  },
)(withStyles(styles)(CustomerIndex));
