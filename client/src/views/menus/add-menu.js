import React, { Component } from "react";
import { connect } from "react-redux";
// import { createMenu } from "../../actions/categoryActions";

//components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../../components/Modal";

class AddMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      description: "",
      price: "",
      category: "",
      tags: ""
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/menus");
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, description, price, category, tags } = this.state;

    this.props.createMenu({
      name,
      description,
      price,
      category,
      tags
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Modal onSubmit={() => console.log("testing")}>
        <ModalHeader title="Add Menu" onClose={this.handleClose} />
        <ModalBody>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-4 col-form-label">
              Name
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-4 col-form-label">
              Description
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-4 col-form-label">
              Price
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                type="number"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-4 col-form-label">
              Category
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="category"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-4 col-form-label">
              Tags
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                id="tags"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.handleClose}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  null
  // { createMenu }
)(AddMenu);
