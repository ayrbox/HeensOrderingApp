import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import Fetch from '../../components/Fetch';
import CategoryForm from './components/CategoryForm';

import MainLayout from '../viewcomponents/MainLayout';
import styles from './styles';

const Categories = ({ classes, history }) => (
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
              onEdit={categoryId => history.push(`/categories/${categoryId}/edit`)}
              onDelete={categoryId => history.push(`/categories/${categoryId}/delete`)}
            />
          );
        } }
      </Fetch>
      <CategoryForm
        open
        onClose={() => console.log('Closing')}
        onSubmit={(data) => console.log('Submittin', data)}
      />
    </div>
  </MainLayout>
);

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withStyles(styles)(Categories);
