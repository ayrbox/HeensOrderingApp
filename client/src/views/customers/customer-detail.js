import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomer } from '../../actions/customerActions';
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';

class CustomerDetail extends Component {
  componentDidMount() {
    this.props.getCustomer(this.props.match.params.id);
  }

  render() {
    const { current, loading } = this.props.customers;

    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Customer</h1>
          <p className="lead">Detail of customer</p>
        </div>
        {!current || loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <form>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-5">
                  <input
                    type="name"
                    className="form-control-plaintext"
                    id="name"
                    name="name"
                    value={current.name}
                    placeholder="Enter customer name..."
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="phoneNo" className="col-sm-2 col-form-label">
                  Contact No
                </label>
                <div className="col-sm-5">
                  <input
                    type="phoneNo"
                    className="form-control-plaintext"
                    id="phoneNo"
                    name="phoneNo"
                    value={current.phoneNo}
                    placeholder="Mobile/Home no..."
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="address" className="col-sm-2 col-form-label">
                  Address
                </label>
                <div className="col-sm-5">
                  <input
                    type="address"
                    className="form-control-plaintext"
                    id="address"
                    name="address"
                    value={current.address}
                    placeholder="address..."
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="postCode" className="col-sm-2 col-form-label">
                  Postcode
                </label>
                <div className="col-sm-5">
                  <input
                    type="postCode"
                    className="form-control-plaintext"
                    id="postCode"
                    name="postCode"
                    value={current.postCode}
                    placeholder="postcode..."
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="note" className="col-sm-2 col-form-label">
                  Note
                </label>
                <div className="col-sm-5">
                  <textarea
                    type="note"
                    className="form-control-plaintext"
                    id="note"
                    name="note"
                    value={current.note}
                    placeholder="Note about customer..."
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2" />
                <div className="col-sm-5">
                  <Link className="btn btn-outline-primary" to="/customers">
                    Back
                  </Link>
                  <Link
                    className="btn btn-outline-danger"
                    to={`/customer/${current._id}/edit`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers,
});

export default connect(
  mapStateToProps,
  { getCustomer },
)(CustomerDetail);
