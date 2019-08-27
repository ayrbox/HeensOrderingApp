import React, { Fragment, useState, useEffect } from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import MenuOptions from './MenuOptions';

const toogleOptionChecked = (id, items) => {
  const idx = items.findIndex(({ id: _ }) => _ === id);

  if (idx === -1) return items;

  const item = Object.assign({}, items[idx], {
    isChecked: !items[idx].isChecked,
  });

  return [
    ...items.slice(0, idx),
    item,
    ...items.slice(idx + 1),
  ];
};

const getTotal = ({ price }, options) => options
  .filter(({ isChecked: _ }) => _)
  .reduce((total, { additionalCost: _ }) => total + _, price);

const renderTotal = (menu, options) => !!options.length && (
  <Fragment>
    <Divider />
    <div style={{ padding: '8px', textAlign: 'right' }}>
      <Typography variant="h1">
        £
        {getTotal(menu, options).toFixed(2)}
      </Typography>
    </div>
  </Fragment>
);

const getOrderItem = (menu, options) => ({
  ...pick(menu, ['name', 'description', 'price']),
  menuOptions: options.filter(({ isChecked: _ }) => _)
    .map(o => pick(o, ['description', 'additionalCost'])),
  itemTotal: getTotal(menu, options),
});

const MenuModal = ({
  menu,
  open,
  resetOrder,
  addOrderItem,
}) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (menu) {
      setOptions(menu.menuOptions.map(({
        _id: id,
        additionalCost,
        description,
      }) => ({
        id,
        additionalCost,
        description,
        isChecked: false,
      })));
    }
  }, [menu]);

  return (
    <Dialog
      open={open}
      aria-labelledby="Order Menu Modal"
      scroll="body"
      onClose={resetOrder}
      data-testid="menu-dialog"
    >
      <DialogContent>
        {menu && (
          <Fragment>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              spacing={8}
            >
              <Grid item>
                <Typography
                  variant="h3"
                  data-testid="menu-name"
                >
                  {menu.name}
                </Typography>
                <Typography
                  variant="body1"
                  data-testid="menu-description"
                >
                  {menu.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h1"
                  data-testid="menu-price"
                >
                  £
                  {menu.price.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <MenuOptions
              options={options}
              onToggleSelect={id => () => {
                setOptions(prev => toogleOptionChecked(id, prev));
              }}
            />
            {renderTotal(menu, options)}
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={resetOrder}
          color="primary"
          data-testid="button-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            const orderItem = getOrderItem(menu, options);
            addOrderItem(orderItem);
          }}
          data-testid="button-select"
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MenuModal.propTypes = {
  menu: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  resetOrder: PropTypes.func.isRequired,
  addOrderItem: PropTypes.func.isRequired,
};

export default withStyles({})(MenuModal);
