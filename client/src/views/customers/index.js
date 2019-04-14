import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import { fetchCustomers, clearCustomers } from '../../actions/customerActions';

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
    const { customers: { loading, list, errors } } = this.props;

    let pageContent;

    if (loading || list.length === 0) {
      pageContent = <Spinner />;
    } else {
      pageContent = (
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
      );
    }
    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Customers</h1>
          <p className="lead">List of customers</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-right mb-3">
              <Link className="btn btn-primary" to="/customers/add">
                New Customer
              </Link>
            </div>
          </div>

          {errors && errors.msg ? (
            <div className="row">
              <div className="col-12 mb-3">
                <div className="alert alert-warning">{errors.msg}</div>
              </div>
            </div>
          ) : null}

          {pageContent}
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
};

const mapStateToProps = state => ({
  customers: state.customers,
});

export default connect(
  mapStateToProps, {
    fetchCustomers,
    clearCustomers,
  },
)(CustomerIndex);
