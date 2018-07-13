import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MainLayout from "../viewcomponents/MainLayout";

import { getCategories } from "../../actions/categoryActions";

class CategoryIndex extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { loading, list } = this.props.categories;

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
            {list.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <Link to={`/categories/${c._id}`} className="btn btn-link">
                    View
                  </Link>
                  <Link
                    to={`/categories/${c._id}/edit`}
                    className="btn btn-link"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/categories/${c._id}/delete`}
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
              <Link className="btn btn-primary" to="/categories/add">
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

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    getCategories
  }
)(CategoryIndex);
