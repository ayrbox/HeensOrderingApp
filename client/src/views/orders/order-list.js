import React, { Component } from "react";
import { connect } from "react-redux";

//@components
import MainLayout from "../viewcomponents/MainLayout";

class OrderList extends Component {
  render() {
    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Order List</h1>
          <p className="lead">List or orders</p>
        </div>

        <div className="container">
          <div className="row">
            <h1>Test</h1>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps)(OrderList);
