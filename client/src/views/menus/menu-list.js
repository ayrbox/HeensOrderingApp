import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { usePageState, ACTIONS } from '../../components/PageProvider';
import MainLayout from '../viewcomponents/MainLayout';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';
import MenuForm from './MenuForm';
import { getMenus, deleteMenu } from '../../api/menus';

import styles from './styles';

const MenuList = ({ classes }) => {
  const [{ loading, data }, dispatch] = usePageState();

  const handleFetch = () => {
    dispatch({
      type: ACTIONS.FETCHING,
    });

    getMenus().then(({ data: menus }) => {
      dispatch({
        type: ACTIONS.FETCHED,
        payload: menus,
      });
    });
  };

  useEffect(handleFetch, []);

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
          onAddClicked={() => dispatch({
            type: ACTIONS.ADD,
          })}
        />
        {
          loading ? <p>Loading...</p> : (
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
              data={data}
              onDelete={async (menuId) => {
                try {
                  dispatch({ type: ACTIONS.DELETING });
                  await deleteMenu(menuId);
                  dispatch({ type: ACTIONS.DELETED });
                  handleFetch();
                } catch (err) {
                  dispatch({
                    type: ACTIONS.ERROR,
                    payload: err,
                  });
                }
              }}
            />
          )
        }
      </div>
      <MenuForm />
    </MainLayout>
  );
};

MenuList.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MenuList);
