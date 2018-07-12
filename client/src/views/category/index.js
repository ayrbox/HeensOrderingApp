import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MainLayout from "../viewcomponents/MainLayout";

class CategoryIndex extends Component {
  render() {
    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Categories</h1>
          <p className="lead">List of Menu Categories</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-right mb-3">
              <Link className="btn btn-primary" to="/customers/add">
                New Category
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default connect(null)(CategoryIndex);
