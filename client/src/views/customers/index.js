import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';
import styles from './styles';

import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import Fetch from '../../components/Fetch';

const CustomerIndex = ({ classes, history }) => (
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
      <Fetch url="/api/customers">
        {({ loading, data }) => {
          if (loading) {
            return <Spinner />;
          }

          return (
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
              onDelete={customerId => history.push(`/customers/${customerId}`)}
            />
          );
        }}
      </Fetch>
    </div>
  </MainLayout>
);

CustomerIndex.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withStyles(styles)(CustomerIndex);
