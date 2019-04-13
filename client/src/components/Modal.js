import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Modal extends Component {
  render() {
    return (
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{
          display: 'block',
          backgroundColor: 'rgba(0,0,0,.6)',
        }}
      >
        <div
          className={classnames('modal-dialog modal-dialog-centered', {
            'modal-lg': this.props.size === 'large',
          })}
          role="document"
        >
          <form onSubmit={this.props.onSubmit} className="modal-content">
            {this.props.children}
          </form>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onSubmit: PropTypes.func,
};

const ModalBody = ({ children }) => (
  <div className="modal-body">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

const ModalHeader = ({ title, onClose }) => (
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">
      {title}
    </h5>
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
      onClick={onClose}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
export { ModalHeader, ModalFooter, ModalBody };
