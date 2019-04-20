import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';

import MainLayout from '../viewcomponents/MainLayout';
import { getCategories } from '../../actions/categoryActions';
import styles from './styles';


class Categories extends Component {
  componentDidMount() {
    const { getCategories: handleGetCategories } = this.props;
    handleGetCategories();
  }

  render() {
    const { categories, classes, history } = this.props;
    const { loading, list } = categories;

    let listContent;
    if (loading) {
      listContent = <p>Loading..... </p>;
    } else {
      listContent = (
        <DataTable
          data={list}
          columns={[
            {
              name: '_id',
              label: 'Category Id',
              key: true,
              hidden: true,
            }, {
              name: 'name',
              label: 'Name',
            }, {
              name: 'description',
              label: 'Description',
            },
          ]}
          onEdit={categoryId => history.push(`/categories/${categoryId}/edit`)}
          onDelete={categoryId => history.push(`/categories/${categoryId}/delete`)}
        />
      );
    }

    return (
      <MainLayout>
        <div className={classes.contentWrapper}>
          <PageHeader
            title="Menu Categories"
            subTitle="List of menu categories"
            addButtonLink={{
              pathname: '/categories/add',
              state: { modal: true },
            }}
          />
          {listContent}
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
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps, {
    getCategories,
  },
)(withStyles(styles)(Categories));
