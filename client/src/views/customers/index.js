import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      customers: { loading, list, errors },
      classes,
    } = this.props;

    let pageContent;

    if (loading || list.length === 0) {
      pageContent = <Spinner />;
    } else {
      pageContent = (
        <div>
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
            onEdit={id => alert(`EDIT ID ${id}`)}
            onDelete={id => alert(`DELETE ID ${id}`)}
          />
          <div className="table-reponsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Postcode</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map(({
                  _id: customerId,
                  name,
                  phoneNo,
                  address,
                  postCode,
                }) => (
                  <tr key={customerId}>
                    <td>{name}</td>
                    <td>{phoneNo}</td>
                    <td>{address}</td>
                    <td>{postCode}</td>
                    <td>
                      <Link className="btn btn-link" to={`/customers/${customerId}`}>
                        View
                      </Link>
                      <Link
                        className="btn btn-link"
                        to={`/customer/${customerId}/edit`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
            {errors && errors.msg ? (
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="alert alert-warning">{errors.msg}</div>
                </div>
              </div>
            ) : null}

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
