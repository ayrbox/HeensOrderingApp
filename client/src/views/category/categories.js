import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { usePageState, ACTIONS } from '../../components/PageProvider';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import Fetch from '../../components/Fetch';

import MainLayout from '../viewcomponents/MainLayout';
import CategoryForm from './components/CategoryForm';
import styles from './styles';

const Categories = ({ classes }) => {
  const [ , dispatch ]= usePageState();
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
        <button type="button" onClick={() => dispatch({
          type: ACTIONS.ADD,
          id: '293842938472938742938',
        })}>Add Category</button>
        <Fetch url="/api/categories">
          {({ loading, data }) => {
            if (loading) {
              return <p>Loading....</p>;
            }
            return (
              <DataTable
                data={data}
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
                onEdit={categoryId => console.log(categoryId)}
                onDelete={categoryId => console.log(categoryId)}
              />
            );
          } }
        </Fetch>
      </div>
      <CategoryForm />
    </MainLayout>
  );
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Categories);
