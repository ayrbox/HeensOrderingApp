import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//views
import MainLayout from "../viewcomponents/MainLayout";

//actions
import { getMenus } from "../../actions/menuActions";

class MenuList extends Component {
  componentDidMount() {
    this.props.getMenus();
  }

  render() {
    const { list, loading } = this.props.menus;
    let listContent = <pre>{JSON.stringify(this.props.menus, null, 2)}</pre>;

    if (list.length === 0 || loading) {
      listContent = "Loading.....";
    } else {
      listContent = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category / Tags</th>
            </tr>
          </thead>
          <tbody>
            {list.map(m => (
              <tr key={m._id}>
                <td>
                  <Link to={`/menus/${m._id}`}>{m.name}</Link>
                </td>
                <td>{m.description}</td>
                <td>&pound;{m.price}</td>
                <td>
                  {m.category.name}
                  <br />
                  {m.tags.map((t, i) => (
                    <label
                      key={i}
                      className="badge badge-pill badge-dark ml-1 mb-1"
                    >
                      {t}
                    </label>
                  ))}
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
          <h1 className="display-4">Menu</h1>
          <p className="lead">List of Menu</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-right mb-3">
              <Link
                className="btn btn-primary"
                to={{
                  pathname: `/menus/add`,
                  state: { modal: true }
                }}
              >
                New Menu
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
  menus: state.menus
});

export default connect(
  mapStateToProps,
  {
    getMenus
  }
)(MenuList);
