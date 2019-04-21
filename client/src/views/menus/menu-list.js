import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import MainLayout from '../viewcomponents/MainLayout';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';
import Fetch from '../../components/Fetch';

import styles from './styles';

const MenuList = ({ classes }) => (
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
      <Fetch url="/api/menus">
        {
          ({ loading, data: menus }) => {
            if (loading) {
              return <p>Loading....</p>;
            }

            return (
              <DataTable
                columns={[
                  {
                    name: '_id',
                    label: 'Menu Id',
                    key: true,
                    hidden: true,
                  }, {
                    name: 'name',
                    label: 'Menu Name',
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
                data={menus}
              />
            );
          }
        }
      </Fetch>
    </div>
  </MainLayout>
);

MenuList.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MenuList);
