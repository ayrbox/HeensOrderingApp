import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Object } from 'core-js';

class OrderStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  handleToggleMenu(e) {
    e.preventDefault();
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { orderStatuses } = this.props.takeOrder;
    const { currentStatus } = this.props;
    return (
      <div
        className={classnames('btn-group', {
          show: this.state.open,
        })}
        role="group"
      >
        <div className="btn btn-primary">{orderStatuses[currentStatus]}</div>
        <button
          id="btnGroup"
          type="button"
          className="btn btn-outline-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleToggleMenu}
        />
        {orderStatuses ? (
          <div
            className={classnames('dropdown-menu dropdown-menu-right', {
              show: this.state.open,
            })}
            aria-labelledby="btnGroupDrop1"
          >
            {Object.keys(orderStatuses).map(key => (
              <button
                key={key}
                className="dropdown-item"
                onClick={(e) => {
                  this.handleToggleMenu(e);
                  this.props.onItemClick(key);
                }}
              >
                {orderStatuses[key]}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

OrderStatusButton.propTypes = {
  takeOrder: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  takeOrder: state.takeOrder,
});

export default connect(mapStateToProps)(OrderStatusButton);
