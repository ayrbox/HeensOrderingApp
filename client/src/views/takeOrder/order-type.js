import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/Modal';

// @actions
import { setOrderType } from '../../actions/takeOrderActions';

class OrderType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderTypes: {
        delivery: 'Delivery',
        collection: 'Collection',
        table: 'Table Order',
      },
      orderType: 'delivery',
      tableNo: '',
      name: '',
      address: '',
      postCode: '',
      contactNo: '',
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCancel(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/orders');
  }

  handleConfirm(e) {
    e.preventDefault();

    const {
      orderType,
      tableNo,
      name,
      address,
      postCode,
      contactNo,
    } = this.state;

    const o = {
      orderType,
      tableNo,
      deliveryAddress: {
        name,
        address,
        postCode,
        contactNo,
      },
    };

    const {
      setOrderType: handleSetOrderType,
      history,
    } = this.props;
    handleSetOrderType(o);
    history.push('/takeorder');
  }

  render() {
    const {
      orderTypes,
      orderType,
      name,
      address,
      postCode,
      contactNo,
      tableNo,
    } = this.state;
    return (
      <Modal onClose={this.handleCancel} size="large">
        <ModalHeader title="Order Type" onClose={this.handleCancel} />
        <ModalBody>
          <div className="form-group row">
            <label htmlFor="ordertype" className="col-sm-4 col-form-label">
              Type
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                id="orderType"
                name="orderType"
                value={orderType}
                onChange={this.handleChange}
              >
                {Object.keys(orderTypes).map(t => (
                  <option key={t} value={t}>
                    {orderTypes[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {orderType === 'delivery' ? (
            <div>
              <hr />
              <h4>Delivery Detail</h4>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="address" className="col-sm-4 col-form-label">
                  Address
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="postCode" className="col-sm-4 col-form-label">
                  Post Code
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="postCode"
                    id="postCode"
                    value={postCode}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="contactNo" className="col-sm-4 col-form-label">
                  Contact No
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="contactNo"
                    id="contactNo"
                    value={contactNo}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {orderType === 'table' ? (
            <div>
              <hr />
              <h4>Table Detail</h4>
              <div className="form-group row">
                <label htmlFor="tableNo" className="col-sm-4 col-form-label">
                  Table No.
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="tableNo"
                    id="tableNo"
                    value={tableNo}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <div className="d-flex w-100 justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={this.handleConfirm}
              type="submit"
            >
              Confirm
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

OrderType.propTypes = {
  setOrderType: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { setOrderType },
)(OrderType);
