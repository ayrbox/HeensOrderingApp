import React, { Component } from "react";
import { connect } from "react-redux";

import { getCustomer } from "../../actions/customerActions";

class CustomerDetail extends Component {
  componentDidMount() {
    this.props.getCustomer(this.props.match.params.id);
  }
  render() {
    return (
      <pre>
        <h1>{this.props.match.params.id}</h1>
        {JSON.stringify(this.props.customers.current, null, 2)}
      </pre>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers
});

export default connect(
  mapStateToProps,
  { getCustomer }
)(CustomerDetail);
