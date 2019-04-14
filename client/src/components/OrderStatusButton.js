import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    const {
      takeOrder: { orderStatuses },
      currentStatus,
      onItemClick,
    } = this.props;
    const { open } = this.state;
    return (
      <div
        className={classnames('btn-group', {
          show: open,
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
              show: open,
            })}
            aria-labelledby="btnGroupDrop1"
          >
            {Object.keys(orderStatuses).map(key => (
              <button
                type="button"
                key={key}
                className="dropdown-item"
                onClick={(e) => {
                  this.handleToggleMenu(e);
                  onItemClick(key);
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
  takeOrder: PropTypes.shape().isRequired,
  onItemClick: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  takeOrder: state.takeOrder,
});

export default connect(mapStateToProps)(OrderStatusButton);
