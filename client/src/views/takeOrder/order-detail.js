import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

//components
import MainLayout from "../viewcomponents/MainLayout";

import { getMenus } from "../../actions/menuActions";
import { getCategories } from "../../actions/categoryActions";

import {
  selectMenuItem,
  confirmMenuItem,
  saveOrder
} from "../../actions/takeOrderActions";

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNote: "",
      discount: 0,
      orderStatus: "ordered"
    };
    this.handleSelectMenuItem = this.handleSelectMenuItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getMenus();

    if (this.props.takeOrder.orderType === undefined) {
      this.props.history.push("/takeorder/type");
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSaveOrder = e => {
    e.preventDefault();

    const { order } = this.props.takeOrder;
    const { orderNote, orderStatus, discount } = this.state;

    const newOrder = {
      ...order,
      orderItems: order.orderItems.map(item => {
        const { name, description, price, menuOptions } = item;

        return {
          name,
          description,
          price,
          menuOptions: menuOptions.map(o => {
            const { additionalCost, description } = o;
            return {
              additionalCost,
              description
            };
          }),
          itemTotal: menuOptions.reduce(
            (acc, o) => acc + o.additionalCost,
            price
          )
        };
      }),
      orderNote,
      orderStatus,
      discount
    };

    this.props.saveOrder(newOrder);
    this.setState({
      orderStatus: "ordered",
      discount: 0,
      orderNote: ""
    });
    //@todo Show order received msg (Toaster) after order saved
  };

  handleSelectMenuItem(menu) {
    this.props.selectMenuItem(menu);
    this.props.history.push("/takeorder/options");
  }

  handleDiscount(discount) {
    this.setState({
      discount: discount
    });
  }

  render() {
    const { takeOrder } = this.props;
    const { order, orderStatuses } = takeOrder;
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
                        <h5>
                          &pound;
                          {item.price}
                        </h5>
                      </div>
                      {item.menuOptions.map((o, i) => (
                        <div
                          key={i}
                          className="d-flex w-100 justify-content-between"
                        >
                          <p className="text-muted">{o.description}</p>
                          <strong>
                            &pound;
                            {o.additionalCost}
                          </strong>
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

                <div className="form-group row">
                  <label
                    htmlFor="orderStatus"
                    className="col-sm-4 col-form-label"
                  >
                    Status:
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      id="orderStatus"
                      name="orderStatus"
                      value={this.state.orderStatus}
                      onChange={this.handleChange}
                    >
                      {Object.keys(orderStatuses).map(s => (
                        <option key={s} value={s}>
                          {orderStatuses[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-8">
                    {[0, 10, 15, 20].map(discount => (
                      <button
                        key={discount}
                        className={classnames(
                          "btn btn-lg",
                          {
                            "btn-outline-secondary":
                              this.state.discount !== discount
                          },
                          { "btn-primary": this.state.discount === discount }
                        )}
                        onClick={e => {
                          e.preventDefault();
                          this.handleDiscount(discount);
                        }}
                      >
                        {discount}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="note" className="col-sm-4 col-form-label">
                    Note:
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      id="orderNote"
                      name="orderNote"
                      value={this.state.orderNote}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={this.handleSaveOrder}
                >
                  Save
                </button>

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
                <hr />
                <h2>Categories</h2>
                {this.props.categories.list.map(c => (
                  <span
                    className="btn btn-outline-secondary btn-lg"
                    key={c._id}
                  >
                    {c.name}
                  </span>
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
  { getCategories, getMenus, selectMenuItem, confirmMenuItem, saveOrder }
)(OrderDetail);
