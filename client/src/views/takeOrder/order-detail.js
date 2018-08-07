import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//components
import MainLayout from "../viewcomponents/MainLayout";

import { getMenus } from "../../actions/menuActions";
import { getCategories } from "../../actions/categoryActions";

import {
  selectMenuItem,
  confirmMenuItem
} from "../../actions/takeOrderActions";
import { totalmem } from "os";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.handleSelectMenuItem = this.handleSelectMenuItem.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getMenus();

    if (this.props.takeOrder.orderType === undefined) {
      this.props.history.push("/takeorder/type");
    }
  }

  handleSelectMenuItem(menu) {
    this.props.selectMenuItem(menu);
    this.props.history.push("/takeorder/options");
  }

  render() {
    const { takeOrder } = this.props;
    const order = takeOrder.order;
    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Take Order</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px"
                }}
              >
                <h2>Order</h2>

                <div className="list-group">
                  {takeOrder.order.orderItems.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.name}</h5>
                        <h5>&pound;{item.price}</h5>
                      </div>
                      {item.menuOptions.map((o, i) => (
                        <div
                          key={i}
                          className="d-flex w-100 justify-content-between"
                        >
                          <p className="text-muted">{o.description}</p>
                          <strong>&pound;{o.additionalCost}</strong>
                        </div>
                      ))}
                    </a>
                  ))}

                  <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Total</h5>
                      <h5>
                        &pound;
                        {order.orderItems.reduce((total, item, idx) => {
                          const additionalCost = item.menuOptions.reduce(
                            (a, o) => {
                              return a + o.additionalCost;
                            },
                            0
                          );
                          return total + item.price + additionalCost;
                        }, 0)}
                      </h5>
                    </div>
                  </a>
                </div>

                <hr />

                <Link className="float-right" to={"/takeorder/type"}>
                  Edit
                </Link>
                <h4>{takeOrder.orderTypes[order.orderType]}</h4>

                {order.orderType === "delivery" ? (
                  <div>
                    {order.deliveryAddress.name} <br />
                    {order.deliveryAddress.address} <br />
                    {order.deliveryAddress.postCode} <br />
                    {order.deliveryAddress.contactNo}
                  </div>
                ) : null}

                {order.orderType === "table" ? (
                  <div>Table No: {order.tableNo}</div>
                ) : null}

                <hr />

                <button className="btn btn-primary">Save</button>

                {/* <pre>{JSON.stringify(takeOrder, null, 2)}</pre> */}
              </div>
            </div>
            <div className="col-sm-6">
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px"
                }}
              >
                <h2>Categories</h2>
                {this.props.categories.list.map(c => (
                  <span
                    className="btn btn-outline-secondary btn-lg"
                    key={c._id}
                  >
                    {c.name}
                  </span>
                ))}
                <h2>Menus</h2>
                {this.props.menus.list.map(m => (
                  <button
                    className="btn btn-outline-secondary btn-lg"
                    key={m._id}
                    onClick={() => this.handleSelectMenuItem(m)}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.menus,
  categories: state.categories,
  takeOrder: state.takeOrder
});

export default connect(
  mapStateToProps,
  { getCategories, getMenus, selectMenuItem, confirmMenuItem }
)(OrderDetail);
