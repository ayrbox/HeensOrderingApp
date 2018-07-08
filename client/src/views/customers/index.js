import React, { Component } from "react";
import { connect } from "react-redux";
import MainLayout from "../viewcomponents/MainLayout";
import Spinner from "../../components/Spinner";
import { fetchCustomers, clearCustomers } from "../../actions/customerActions";

class CustomerIndex extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }

  componentWillUnmount() {
    this.props.clearCustomers();
  }

  render() {
    const { loading, list, errors } = this.props.customers;

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
              </tr>
            </thead>
            <tbody>
              {list.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.phoneNo}</td>
                  <td>{c.address}</td>
                  <td>{c.postCode}</td>
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
              <button className="btn btn-primary">New Customer</button>
            </div>
          </div>

          {errors.msg ? (
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

const mapStateToProps = state => ({
  customers: state.customers
});

export default connect(
  mapStateToProps,
  { fetchCustomers, clearCustomers }
)(CustomerIndex);
