import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//components
import MainLayout from "../viewcomponents/MainLayout";

import { getMenus } from "../../actions/menuActions";
import { getCategories } from "../../actions/categoryActions";

class TakeOrder extends Component {
  componentDidMount() {
    if (this.props.categories.list.length === 0) {
      this.props.getCategories();
    }

    if (this.props.menus.list.length === 0) {
      this.props.getMenus();
    }
  }
  render() {
    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Take Order</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px"
                }}
              >
                <h2>Order</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px"
                }}
              >
                <h2>Categories</h2>
                {this.props.categories.list.map(c => (
                  <span
                    className="btn btn-outline-secondary btn-lg"
                    key={c._id}
                  >
                    {c.name}
                  </span>
                ))}
                <h2>Menus</h2>
                {this.props.menus.list.map(m => (
                  <Link
                    className="btn btn-outline-secondary btn-lg"
                    key={m._id}
                    to={`/takeorder/${m._id}`}
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.menus,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { getCategories, getMenus }
)(TakeOrder);
