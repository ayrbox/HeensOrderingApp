import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// components
import MainLayout from '../viewcomponents/MainLayout';

import { getMenus } from '../../actions/menuActions';
import { getCategories } from '../../actions/categoryActions';

import {
  selectMenuItem,
  confirmMenuItem,
  saveOrder,
} from '../../actions/takeOrderActions';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNote: '',
      discount: 0,
      orderStatus: 'ordered',
    };
    this.handleSelectMenuItem = this.handleSelectMenuItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
  }

  componentDidMount() {
    const {
      getCategories: handleGetCategories,
      getMenus: handleGetMenus,
      takeOrder: {
        orderType,
      },
      history,
    } = this.props;
    handleGetCategories();
    handleGetMenus();

    if (orderType === undefined) {
      history.push('/takeorder/type');
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSaveOrder = (e) => {
    e.preventDefault();

    const {
      takeOrder: { order },
      saveOrder: handleSaveOrder,
    } = this.props;
    const { orderNote, orderStatus, discount } = this.state;

    const newOrder = {
      ...order,
      orderItems: order.orderItems.map((item) => {
        const {
          name, description, price, menuOptions,
        } = item;

        return {
          name,
          description,
          price,
          menuOptions: menuOptions.map(o => ({ ...o })),
          itemTotal: menuOptions.reduce((acc, o) => acc + o.additionalCost, price),
        };
      }),
      orderNote,
      orderStatus,
      discount,
    };

    handleSaveOrder(newOrder);
    this.setState({
      orderStatus: 'ordered',
      discount: 0,
      orderNote: '',
    });
    // @todo Show order received msg (Toaster) after order saved
  };

  handleSelectMenuItem(menu) {
    const {
      selectMenuItem: handleSelectMenuItem,
      history,
    } = this.props;

    handleSelectMenuItem(menu);
    history.push('/takeorder/options');
  }

  handleDiscount(discount) {
    this.setState({
      discount,
    });
  }

  render() {
    const {
      takeOrder,
      menus,
      categories,
    } = this.props;
    const { order, orderStatuses } = takeOrder;

    const {
      orderStatus,
      discount,
      orderNote,
    } = this.state;
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
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h2>Order</h2>

                <div className="list-group">
                  {takeOrder.order.orderItems.map(({
                    _id: id,
                    name,
                    price,
                    menuOptions,
                  }) => (
                    <button
                      type="button"
                      key={`menu_item_${id}`}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{name}</h5>
                        <h5>{`&pound; ${price}`}</h5>
                      </div>
                      {menuOptions.map(({
                        _id: optionId,
                        description,
                        additionalCost,
                      }) => (
                        <div
                          key={optionId}
                          className="d-flex w-100 justify-content-between"
                        >
                          <p className="text-muted">{description}</p>
                          <strong>{`&pound; ${additionalCost}`}</strong>
                        </div>
                      ))}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Total</h5>
                      <h5>
                        &pound;
                        {order.orderItems.reduce((total, item) => {
                          const additionalCost = item.menuOptions.reduce(
                            (a, o) => a + o.additionalCost,
                            0,
                          );
                          return total + item.price + additionalCost;
                        }, 0)}
                      </h5>
                    </div>
                  </button>
                </div>

                <hr />

                <Link className="float-right" to="/takeorder/type">
                  Edit
                </Link>
                <h4>{takeOrder.orderTypes[order.orderType]}</h4>

                {order.orderType === 'delivery' ? (
                  <div>
                    {order.deliveryAddress.name}
                    {' '}
                    <br />
                    {order.deliveryAddress.address}
                    {' '}
                    <br />
                    {order.deliveryAddress.postCode}
                    {' '}
                    <br />
                    {order.deliveryAddress.contactNo}
                  </div>
                ) : null}

                {order.orderType === 'table' ? (
                  <div>{`Table No: ${order.tableNo}`}</div>
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
                      value={orderStatus}
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
                    {[0, 10, 15, 20].map(discountPercent => (
                      <button
                        type="button"
                        key={discount}
                        className={classnames(
                          'btn btn-lg', {
                            'btn-outline-secondary':
                              discount !== discountPercent,
                          }, {
                            'btn-primary': discount === discountPercent,
                          },
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleDiscount(discount);
                        }}
                      >
                        {discount}
%
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
                      value={orderNote}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSaveOrder}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <div
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h2>Menus</h2>
                {menus.list.map((m) => {
                  const { _id: menuId } = m;
                  return (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      key={menuId}
                      onClick={() => this.handleSelectMenuItem(m)}
                    >
                      {m.name}
                    </button>
                  );
                })}
                <hr />
                <h2>Categories</h2>
                {categories.list.map(({
                  _id: categoryId,
                  categoryName,
                }) => (
                  <span
                    className="btn btn-outline-secondary btn-lg"
                    key={categoryId}
                  >
                    {categoryName}
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
OrderDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  takeOrder: PropTypes.shape({
  }).isRequired,
  getCategories: PropTypes.func.isRequired,
  getMenus: PropTypes.func.isRequired,
  selectMenuItem: PropTypes.func.isRequired,
  saveOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
  categories: state.categories,
  takeOrder: state.takeOrder,
});

export default connect(
  mapStateToProps,
  {
    getCategories, getMenus, selectMenuItem, confirmMenuItem, saveOrder,
  },
)(OrderDetail);
