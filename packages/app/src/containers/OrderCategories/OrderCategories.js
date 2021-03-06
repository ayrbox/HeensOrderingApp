import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/KeyboardArrowRight';
import Fetch from '../../components/Fetch';


import styles from './styles';

const Categories = ({
  classes,
  categoryId,
  setCategory,
}) => (
  <List data-testid="category-list">
    <Fetch url="/api/categories/">
      {({ data, loading }) => {
        if (loading) {
          return 'Loading....';
        }
        return [{ _id: '', name: 'All' }, ...data].map(({
          _id: id,
          name,
        }) => (
          <ListItem
            key={id}
            button
            aria-label="category"
            onClick={(e) => {
              e.preventDefault();
              setCategory(id);
            }}
            data-testid="category-item"
          >
            <ListItemText>{name}</ListItemText>
            {categoryId === id && (
              <ListItemIcon className={classes.categorySelectionIcon}>
                <InboxIcon />
              </ListItemIcon>
            )}
          </ListItem>
        ));
      }}
    </Fetch>
  </List>
);

Categories.defaultProps = {
  categoryId: '',
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
  categoryId: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};

export default withStyles(styles)(Categories);
