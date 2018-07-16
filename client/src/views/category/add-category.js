import React, { Component } from "react";
import { connect } from "react-redux";
import { createCategory } from "../../actions/categoryActions";

class AddCategory extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      description: ""
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/categories");
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, description } = this.state;

    this.props.createCategory({
      name,
      description
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { msg } = this.props.categories;

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
          <form onSubmit={this.handleSubmit} className="modal-content">
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
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Description
                </label>
                <div className="col-sm-8">
                  <textarea
                    value={this.state.description}
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
            </div>
          </form>
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
    createCategory
  }
)(AddCategory);
