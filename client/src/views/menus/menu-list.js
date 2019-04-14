import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// views
import MainLayout from '../viewcomponents/MainLayout';

// actions
import { getMenus } from '../../actions/menuActions';

class MenuList extends Component {
  componentDidMount() {
    const { getMenus: handleGetMenus } = this.props;
    handleGetMenus();
  }

  render() {
    const { menus: { list, loading } } = this.props;

    let listContent = '';

    if (loading) {
      listContent = 'Loading.....';
    } else if (list.length === 0) {
      listContent = (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-warning">No menu found</div>
          </div>
        </div>
      );
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
            {list.map(({
              _id: menuId,
              name,
              description,
              price,
              category,
              tags,
            }) => (
              <tr key={menuId}>
                <td>
                  <Link to={`/menus/${menuId}`}>{name}</Link>
                </td>
                <td>{description}</td>
                <td>{`&pound; ${price}`}</td>
                <td>
                  {category.name}
                  <br />
                  {tags.map(t => (
                    <label
                      key={t}
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
                  pathname: '/menus/add',
                  state: { modal: true },
                }}
              >
                New Menu
              </Link>
            </div>
          </div>
          {listContent}
        </div>
      </MainLayout>
    );
  }
}

MenuList.propTypes = {
  getMenus: PropTypes.func.isRequired,
  menus: PropTypes.shape({
    loading: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  {
    getMenus,
  },
)(MenuList);
