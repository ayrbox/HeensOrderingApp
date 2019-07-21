import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Fetch from '../../components/Fetch';
import styles from './styles';

const Menus = ({
  category,
  classes,
  setMenu,
}) => (
  <List
    cellHeight={160}
    className={classes.gridList}
    cols={3}
  >
    <Fetch url="/api/menus">
      {({ loading, data }) => {
        if (loading) {
          return 'Loading......';
        }
        return data
          .filter(({
            category: { _id: categoryId },
          }) => (category ? categoryId === category : true))
          .map((menu) => {
            const {
              _id: id,
              name,
              price,
              description,
            } = menu;
            return (
              <ListItem
                key={id}
                button
                alignItems="flex-start"
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(menu);
                }}
              >
                <ListItemText
                  primary={<strong>{name}</strong>}
                  secondary={(
                    <Typography component="span" className={classes.itemDesc}>
                      {description}
                    </Typography>
                  )}
                />
                <ListItemSecondaryAction>
                  <Typography variant="h6">
                    {`£${price.toFixed(2)}`}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            );
          });
      }}
    </Fetch>
  </List>
);

Menus.defaultProps = {
  category: undefined,
};

Menus.propTypes = {
  category: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  setMenu: PropTypes.func.isRequired,
};

export default withStyles(styles)(Menus);
