import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @components
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import OrderStatusButton from '../../components/OrderStatusButton';

import { getOrders, updateOrder } from '../../actions/orderActions';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.updateOrderStatus = this.updateOrderStatus.bind(this);
  }

  componentDidMount() {
    const { getOrders: handleGetOrders } = this.props;
    handleGetOrders();
  }

  updateOrderStatus(id, status) {
    const { updateOrder: handleUpdateOrder } = this.props;
    handleUpdateOrder(id, status);
  }


  render() {
    const {
      orders: { loading, list },
      takeOrder: { orderStatuses, orderTypes },
    } = this.props;

    let content = <Spinner />;
    if (!loading) {
      content = list.map(({
        _id: orderId,
        orderType,
        tableNo,
        deliveryAddress,
        orderTotal,
        orderStatus,
      }) => (
        <div className="m-3 p-3 border" key={orderId}>
          <div className="d-flex w-100 justify-content-between">
            {orderType === 'table' ? (
              <div style={{ width: '250px' }}>
                <strong>
                  {`${orderTypes[orderType]} `}
                  <br />
                  {` ${tableNo}`}
                </strong>
              </div>
            ) : null}
            {orderType === 'delivery' ? (
              <div style={{ width: '250px' }}>
                <strong>{orderTypes[orderType]}</strong>
                <br />
                <small>
                  {`
                    ${deliveryAddress.name}
                    ${deliveryAddress.address}
                    ${deliveryAddress.postCode}
                    ${deliveryAddress.contactNo}
                  `}
                </small>
              </div>
            ) : null}
            {orderType === 'collection' ? (
              <div style={{ width: '250px' }}>
                <strong>{orderTypes[orderType]}</strong>
              </div>
            ) : null}
            <div>
              <strong>{orderStatuses[orderStatus]}</strong>
              <br />
              <span>
                {`&pound; ${orderTotal.toFixed(2)} `}
              </span>
            </div>

            <div>
              <OrderStatusButton
                currentStatus={orderStatus}
                onItemClick={(status) => {
                  this.updateOrderStatus(orderId, status);
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
          </div>
        </div>
      </MainLayout>
    );
  }
}

OrderList.propTypes = {
  getOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  orders: PropTypes.shape({
    _id: PropTypes.string,
    orderType: PropTypes.string,
    tableNo: PropTypes.string,
    deliveryAddress: PropTypes.string,
    orderTotal: PropTypes.string,
    orderStatus: PropTypes.string,
  }).isRequired,
  takeOrder: PropTypes.shape({
    orderStatuses: PropTypes.arrayOf(
      PropTypes.string,
    ),
    orderTypes: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }).isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders,
  takeOrder: state.takeOrder,
});

export default connect(
  mapStateToProps,
  { getOrders, updateOrder },
)(OrderList);
