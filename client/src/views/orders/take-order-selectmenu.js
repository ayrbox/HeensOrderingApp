import React, { Component } from "react";
import { connect } from "react-redux";
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../../components/Modal";

//actions
import {
  selectOption,
  cancelMenuItem,
  confirmMenuItem
} from "../../actions/takeOrderActions";

class TakeOrderSelectMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: undefined
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleSelectOption = o => {
    this.props.selectOption(o);
  };

  handleConfirm(e) {
    e.preventDefault();

    this.props.confirmMenuItem();
    //@todo only confirm selected options
    this.props.history.push("/takeorder");
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.cancelMenuItem();
    this.props.history.push("/takeorder");
  }

  componentDidMount() {
    const { menuItem } = this.props.takeOrder;
    if (!menuItem) this.props.history.push("takeorder");
  }

  render() {
    const { menuItem } = this.props.takeOrder;

    if (!menuItem) return null;

    return (
      <Modal onClose={this.handleClose} size="large">
        <ModalHeader title="Select Options" onClose={this.handleCancel} />
        <ModalBody>
          <h4>
            {menuItem.name}{" "}
            <small className="text-muted">{menuItem.category.name}</small>
          </h4>
          <p>{menuItem.description}</p>
          <h1>&pound;{menuItem.price}</h1>

          <div className="list-group">
            {menuItem.menuOptions.map(o => (
              <button
                key={o._id}
                className="list-group-item"
                onClick={e => {
                  e.preventDefault();
                  this.handleSelectOption(o);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  {o.description}
                  {o.additionalCost ? (
                    <span>+ &pound;{o.additionalCost}</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  {o.selected ? <span>&#10003;</span> : null}
                </div>
              </button>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex w-100 justify-content-between">
            <button
              className="btn btn-outline-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={this.handleConfirm}>
              Confirm
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  takeOrder: state.takeOrder
});

export default connect(
  mapStateToProps,
  {
    cancelMenuItem,
    confirmMenuItem,
    selectOption
  }
)(TakeOrderSelectMenu);
