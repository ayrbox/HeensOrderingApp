import React, { Component } from "react";
import { connect } from "react-redux";

import { createCustomer } from "../../actions/customerActions";
import MainLayout from "../viewcomponents/MainLayout";
import Spinner from "../../components/Spinner";

class AddCustomer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      phoneNo: "",
      address: "",
      postCode: "",
      note: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, phoneNo, address, postCode, note } = this.state;
    this.props.createCustomer({
      name,
      phoneNo,
      address,
      postCode,
      note
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customers.errors) {
      this.setState({ errors: nextProps.customers.errors });
    }

    if (nextProps.current) {
      const { name, phoneNo, address, postCode, note } = nextProps.current;
      this.setState({
        name,
        phoneNo,
        address,
        postCode,
        note
      });
    }
  }

  render() {
    const { loading } = this.props.customers;

    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Add/New Customer</h1>
          <p className="lead">Enter detail of new customer</p>
        </div>

        <div className="container">
          {this.state.errors ? (
            <div className="alert alert-danger">
              <pre>{JSON.stringify(this.state.errors, null, 2)}</pre>
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-5">
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={this.state.name}
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
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  value={this.state.phoneNo}
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
                  className="form-control"
                  id="address"
                  name="address"
                  value={this.state.address}
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
                  className="form-control"
                  id="postCode"
                  name="postCode"
                  value={this.state.postCode}
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
                  className="form-control"
                  id="note"
                  name="note"
                  value={this.state.note}
                  placeholder="Note about customer..."
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-2" />
              <div className="col-sm-5">
                {loading ? (
                  <Spinner />
                ) : (
                  <button type="submit" className="btn btn-outline-primary">
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
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
  { createCustomer }
)(AddCustomer);
