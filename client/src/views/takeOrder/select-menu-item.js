import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/Modal';

// actions
import {
  selectOption,
  cancelMenuItem,
  confirmMenuItem,
} from '../../actions/takeOrderActions';

class SelectMenuItem extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    const { history, takeOrder: { menuItem } } = this.props;
    if (!menuItem) history.push('takeorder');
  }

  handleSelectOption = (o) => {
    const { selectOption: handleSelectOption } = this.props;
    handleSelectOption(o);
  };

  handleConfirm(e) {
    e.preventDefault();

    const { history, confirmMenuItem: handleConfirmMenuItem } = this.props;

    handleConfirmMenuItem();
    history.push('/takeorder');
  }

  handleCancel(e) {
    e.preventDefault();
    const { history, cancelMenuItem: handleCancelMenuItem } = this.props;
    handleCancelMenuItem();
    history.push('/takeorder');
  }

  render() {
    const { takeOrder: { menuItem } } = this.props;

    if (!menuItem) return null;

    return (
      <Modal onClose={this.handleClose} size="large">
        <ModalHeader title="Select Options" onClose={this.handleCancel} />
        <ModalBody>
          <h4>
            {menuItem.name}
            {' '}
            <small className="text-muted">{menuItem.category.name}</small>
          </h4>
          <p>{menuItem.description}</p>
          <h1>{`&pound; ${menuItem.price}`}</h1>
          <div className="list-group">
            {menuItem.menuOptions.map((order) => {
              const {
                _id: id,
                additionalCost,
                description,
                selected,
              } = order;
              return (
                <button
                  type="button"
                  key={id}
                  className="list-group-item"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleSelectOption(order);
                  }}
                >
                  <div className="d-flex w-100 justify-content-between">
                    {description}
                    {additionalCost ? (
                      <span>
                        {`+ &pound; ${additionalCost}`}
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                    {selected ? <span>&#10003;</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
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
              type="submit"
              className="btn btn-primary"
              onClick={this.handleConfirm}
            >
              Confirm
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

SelectMenuItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  takeOrder: PropTypes.shape({
    menuItem: PropTypes.shape({
    }),
  }).isRequired,
  selectOption: PropTypes.func.isRequired,
  confirmMenuItem: PropTypes.func.isRequired,
  cancelMenuItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  takeOrder: state.takeOrder,
});

export default connect(
  mapStateToProps,
  {
    cancelMenuItem,
    confirmMenuItem,
    selectOption,
  },
)(SelectMenuItem);
