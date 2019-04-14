import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

const Modal = ({
  children,
  size,
  onSubmit,
}) => (
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
        'modal-lg': size === 'large',
      })}
      role="document"
    >
      <form onSubmit={onSubmit} className="modal-content">
        {children}
      </form>
    </div>
  </div>
);

Modal.defaultProps = {
  size: '',
};

Modal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
export { ModalHeader, ModalFooter, ModalBody };
