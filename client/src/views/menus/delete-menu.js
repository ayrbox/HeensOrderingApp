import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from "classnames";

// actions
import { getMenu, deleteMenu } from '../../actions/menuActions';

// components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '../../components/Modal';

class DeleteMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.history.push(`/menus/${id}`);
  }

  handleDelete(e) {
    const { id } = this.props.match.params;
    this.props.deleteMenu(id, this.props.history);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMenu(id);
  }

  render() {
    const { current } = this.props.menus;
    return (
      <Modal>
        <ModalHeader title="Confirm Delete" onClose={this.handleClose} />
        {current ? (
          <ModalBody>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-4 col-form-label">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="name"
                  name="name"
                  value={current.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-4 col-form-label">
                Description
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="description"
                  name="description"
                  value={current.description}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="price" className="col-sm-4 col-form-label">
                Price
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control-plaintext"
                  id="price"
                  name="price"
                  value={current.price}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="category" className="col-sm-4 col-form-label">
                Category
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="category"
                  name="category"
                  value={current.category.name || ''}
                />
              </div>
            </div>
          </ModalBody>
        ) : (
          <ModalBody>Loading...</ModalBody>
        )}
        <ModalFooter>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.handleClose}
          >
            Back
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  { getMenu, deleteMenu },
)(DeleteMenu);
