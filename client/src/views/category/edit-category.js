import React, { Component } from "react";
import { connect } from "react-redux";

class EditCategory extends Component {
  render() {
    const category = {};
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
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
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
              {category ? (
                <form>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="name"
                        className="form-control-plaintext"
                        id="name"
                        name="name"
                        value={category.name}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 col-form-label">
                      Description
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        value={category.description}
                        className="form-control-plaintext"
                      />
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
            <div className="modal-footer">
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

export default connect(null)(EditCategory);
