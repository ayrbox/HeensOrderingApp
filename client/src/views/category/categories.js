import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MainLayout from '../viewcomponents/MainLayout';

import { getCategories } from '../../actions/categoryActions';

class Categories extends Component {
  componentDidMount() {
    const { getCategories: handleGetCategories } = this.props;
    handleGetCategories();
  }

  render() {
    const { categories } = this.props;
    const { loading, list } = categories;

    let listContent;
    if (loading) {
      listContent = <p>Loading..... </p>;
    } else {
      listContent = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map(({ _id: id, name, description }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                  <Link to={`/categories/${id}`} className="btn btn-link">
                    View
                  </Link>
                  <Link
                    to={`/categories/${id}/edit`}
                    className="btn btn-link"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/categories/${id}/delete`}
                    className="btn btn-link"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Menu Categories</h1>
          <p className="lead">List of Menu Categories</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-right mb-3">
              <Link
                className="btn btn-primary"
                to={{
                  pathname: '/categories/add',
                  state: { modal: true },
                }}
              >
                New Category
              </Link>
            </div>

            {listContent}
          </div>
        </div>
      </MainLayout>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    })),
    current: PropTypes.shape(),
    msg: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps, {
    getCategories,
  },
)(Categories);
