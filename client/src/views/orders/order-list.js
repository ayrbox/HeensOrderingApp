import React, { Component } from "react";
import { connect } from "react-redux";

//@components
import MainLayout from "../viewcomponents/MainLayout";
import Spinner from "../../components/Spinner";
import OrderStatusButton from "../../components/OrderStatusButton";

import { getOrders, updateOrder } from "../../actions/orderActions";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.updateOrderStatus = this.updateOrderStatus.bind(this);
  }

  updateOrderStatus(id, status) {
    this.props.updateOrder(id, status);
  }

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { loading, list, errors } = this.props.orders;
    const { orderStatuses, orderTypes } = this.props.takeOrder;

    let content = <Spinner />;
    if (!loading) {
      content = list.map(order => (
        <div className="m-3 p-3 border" key={order._id}>
          <div className="d-flex w-100 justify-content-between">
            {order.orderType === "table" ? (
              <div style={{ width: "250px" }}>
                <strong>
                  {orderTypes[order.orderType]} <br /> {order.tableNo}
                </strong>
              </div>
            ) : null}
            {order.orderType === "delivery" ? (
              <div style={{ width: "250px" }}>
                <strong>{orderTypes[order.orderType]}</strong>
                <br />
                <small>
                  {order.deliveryAddress.name} <br />
                  {order.deliveryAddress.address}{" "}
                  {order.deliveryAddress.postCode} <br />
                  {order.deliveryAddress.contactNo}
                </small>
              </div>
            ) : null}
            {order.orderType === "collection" ? (
              <div style={{ width: "250px" }}>
                <strong>{orderTypes[order.orderType]}</strong>
              </div>
            ) : null}

            <div>
              <strong>{orderStatuses[order.orderStatus]}</strong>
              <br />
              <span>&pound; {order.orderTotal.toFixed(2)} </span>
            </div>

            <div>
              <OrderStatusButton
                currentStatus={order.orderStatus}
                onItemClick={status => {
                  this.updateOrderStatus(order._id, status);
                }}
              />
            </div>
          </div>
        </div>
      ));
    }

    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Order List</h1>
          <p className="lead">List or orders</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">{content}</div>
            {/* <pre>{JSON.stringify(this.props.orders, null, 2)}</pre> */}
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  takeOrder: state.takeOrder
});

export default connect(
  mapStateToProps,
  { getOrders, updateOrder }
)(OrderList);
