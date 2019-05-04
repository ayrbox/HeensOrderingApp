import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { deleteCategory } from 'api/categories';
import { usePageState, ACTIONS } from 'components/PageProvider';
import PageHeader from 'components/PageHeader';
import DataTable from 'components/DataTable';
import Fetch from 'components/Fetch';

import MainLayout from '../viewcomponents/MainLayout';
import CategoryForm from './components/CategoryForm';
import styles from './styles';


const Categories = ({ classes }) => {
  const [{ id }, dispatch] = usePageState();
  return (
    <MainLayout>
      <div className={classes.contentWrapper}>
        <PageHeader
          title="Menu Categories"
          subTitle="List of menu categories"
          onAddClicked={() => dispatch({ type: ACTIONS.ADD })}
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
                onEdit={categoryId => dispatch({
                  type: ACTIONS.EDIT,
                  payload: { id: categoryId },
                })}
                onDelete={async (categoryId) => {
                  dispatch({
                    type: ACTIONS.DELETING,
                    payload: categoryId,
                  });
                  await deleteCategory(categoryId);
                  dispatch({
                    type: ACTIONS.DELETED,
                    payload: 'Category deleted successfully',
                  });
                }}
              />
            );
          } }
        </Fetch>
      </div>
      <CategoryForm id={id} />
    </MainLayout>
  );
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Categories);
