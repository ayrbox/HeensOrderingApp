import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

// views
import MainLayout from '../viewcomponents/MainLayout';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';

// actions
import { getMenus } from '../../actions/menuActions';

import styles from './styles';

class MenuList extends Component {
  componentDidMount() {
    const { getMenus: handleGetMenus } = this.props;
    handleGetMenus();
  }

  render() {
    const {
      menus: { list, loading },
      classes,
    } = this.props;

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
        <DataTable
          columns={[
            {
              name: '_id',
              label: 'Menu Id',
              key: true,
              hidden: true,
            }, {
              name: 'name',
              label: 'name',
              render: (name, menuId) => <Link to={`/menus/${menuId}`}>{name}</Link>,
            }, {
              name: 'description',
              label: 'Description',
            }, {
              name: 'price',
              label: 'Price',
            }, {
              name: 'category',
              label: 'Category',
              render: value => <span>{value.name}</span>,
            }, {
              name: 'tags',
              label: 'Tags',
              render: tag => tag.map(t => (
                <label key={t}>{t}</label>
              )),
            },
          ]}
          data={list}
        />
      );
    }

    return (
      <MainLayout>
        <div className={classes.contentWrapper}>
          <PageHeader
            title="Menu"
            subTitle="List of menu"
            addButtonLink={{
              pathname: '/menus/add',
              state: { modal: true },
            }}
          />
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
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  {
    getMenus,
  },
)(withStyles(styles)(MenuList));
