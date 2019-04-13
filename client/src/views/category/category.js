import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategory } from '../../actions/categoryActions';

class Category extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { getCategory: handleGetCategory, match: { params: { id } } } = this.props;
    handleGetCategory(id);
  }

  handleClose(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/categories/');
  }

  render() {
    const { categories: { current } } = this.props;
    const category = current;
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
                      <div className="form-control-plaintext">{category.name}</div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 col-form-label">
                      Description
                    </label>
                    <div className="col-sm-8">
                      <div className="form-control-plaintext">{category.description}</div>
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

Category.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  getCategory: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps, {
    getCategory,
  },
)(Category);
