import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategory, deleteCategory } from "../../actions/categoryActions";

class DeleteCategory extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCategory(id);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/categories");
  }

  handleDelete(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.deleteCategory(id);

    this.props.history.push("/categories");
  }

  render() {
    const { current, msg } = this.props.categories;
    if (!current) return null;

    return (
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,.6)"
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Menu Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {msg ? (
                <div className="form-group ">
                  <div className="alert alert-warning">{msg}</div>
                </div>
              ) : null}
              <div className="form-group">
                <div className="alert alert-danger">
                  Are you sure you want to delete the menu category? Clicking
                  `delete` will remove category permanently.
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Name
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control-plaintext"
                    id="name"
                    name="name"
                    value={current.name}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Description
                </label>
                <div className="col-sm-8">
                  <textarea
                    value={current.description}
                    className="form-control-plaintext"
                    name="description"
                    id="description"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
                data-dismiss="modal"
                onClick={this.handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    deleteCategory,
    getCategory
  }
)(DeleteCategory);
