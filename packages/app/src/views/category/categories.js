import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getCategories, deleteCategory } from '../../api/categories';
import { usePageState, ACTIONS } from '../../components/PageProvider';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';

import MainLayout from '../viewcomponents/MainLayout';
import CategoryForm from './components/CategoryForm';
import styles from './styles';

const Categories = ({ classes }) => {
  const [{ id, data, loading }, dispatch] = usePageState();

  const handleDataFetch = () => {
    dispatch({ type: ACTIONS.FETCHING });
    getCategories().then(({ data: categories }) => {
      dispatch({
        type: ACTIONS.FETCHED,
        payload: categories,
      });
    });
  };

  useEffect(handleDataFetch, []);

  return (
    <MainLayout>
      <div className={classes.contentWrapper}>
        <PageHeader
          title="Menu Categories"
          subTitle="List of menu categories"
          onAddClicked={() => dispatch({ type: ACTIONS.ADD })}
        />
        {loading ? <p>Loading....</p>
          : (
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
                handleDataFetch();
              }}
            />
          )
        }
      </div>
      <CategoryForm id={id} reloadAction={handleDataFetch} />
    </MainLayout>
  );
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Categories);
