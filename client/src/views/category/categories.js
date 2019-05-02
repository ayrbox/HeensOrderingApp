import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { PageContext, PageProvider } from '../../components/PageProvider';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import Fetch from '../../components/Fetch';
import CategoryForm from './components/CategoryForm';

import MainLayout from '../viewcomponents/MainLayout';
import styles from './styles';

const Categories = ({ classes }) => (
  <PageProvider>
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

        <PageContext.Consumer>
          {({ handleEdit, handleDelete }) => (
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
                    onEdit={categoryId => handleEdit(categoryId)}
                    onDelete={categoryId => handleDelete(categoryId)}
                  />
                );
              } }
            </Fetch>
          )}
        </PageContext.Consumer>
        <CategoryForm
          open={false}
          onClose={() => console.log('Closing')}
          onSubmit={(data) => console.log('Submittin', data)}
        />
      </div>
    </MainLayout>
  </PageProvider>
);

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Categories);
