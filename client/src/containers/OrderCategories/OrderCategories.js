import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Fetch from '../../components/Fetch';

import styles from './styles';

const Categories = ({
  classes,
  category,
  setCategory,
}) => (
  <div className={classes.content}>
    <Fetch url="/api/categories/">
      {({ data, loading }) => {
        if (loading) {
          return 'Loading....';
        }
        return [...data, { _id: '', name: 'All' }].map(({
          _id: id,
          name,
        }) => (
          <Fab
            key={id}
            variant="extended"
            aria-label="Delete"
            className={classes.categoryButton}
            color={category === id ? 'primary' : 'default'}
            onClick={(e) => {
              e.preventDefault();
              setCategory(id);
            }}
          >
            {name}
          </Fab>
        ));
      }}
    </Fetch>
  </div>
);

Categories.defaultProps = {
  category: undefined,
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
  category: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};

export default withStyles(styles)(Categories);
