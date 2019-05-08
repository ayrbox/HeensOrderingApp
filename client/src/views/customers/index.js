import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import styles from './styles';

import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';

import PageProvider, { ACTIONS, usePageState } from '../../components/PageProvider';
import { getCustomers, deleteCustomer } from '../../api/customers';

const CustomerIndex = ({ classes, history }) => {
  const [{ data, loading }, dispatch] = usePageState();

  const handleDataFetch = () => {
    dispatch({ type: ACTIONS.FETCHING });
    getCustomers().then(({ data: customers }) => {
      dispatch({
        type: ACTIONS.FETCHED,
        payload: customers,
      });
    });
  };

  useEffect(handleDataFetch, []);

  return (
    <PageProvider>
      <MainLayout>
        <div className={classes.contentWrapper}>
          <PageHeader
            title="Customers"
            subTitle="List of customers"
            addButtonLink={{
              pathname: '/customers/add',
              state: { modal: true },
            }}
          />
          { loading ? <Spinner /> : (
            <DataTable
              data={data}
              columns={[
                {
                  name: '_id',
                  label: 'CustomerId',
                  key: true,
                  hidden: true,
                },
                {
                  name: 'name',
                  label: 'Name',
                },
                {
                  name: 'phoneNo',
                  label: 'Contact Number',
                }, {
                  name: 'address',
                  label: 'Address',
                }, {
                  name: 'postCode',
                  label: 'Post Code',
                },
              ]}
              onEdit={customerId => history.push(`/customers/${customerId}`)}
              onDelete={async (customerId) => {
                dispatch({
                  type: ACTIONS.DELETING,
                  payload: customerId,
                });
                await deleteCustomer(customerId);
                dispatch({
                  type: ACTIONS.DELETED,
                  payload: 'Customer deleted successfully',
                });
                handleDataFetch();
              }}
            />
          )}
        </div>
      </MainLayout>
    </PageProvider>
  );
};

CustomerIndex.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withStyles(styles)(CustomerIndex);
