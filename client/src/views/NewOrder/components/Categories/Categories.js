import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Fetch from '../../../../components/Fetch';

import styles from './styles';

const Categories = ({
  classes,
  selected,
  onSelect,
}) => (
  <div className={classes.content}>
    <Fetch url="/api/categories/">
      {({ data, loading }) => {
        if (loading) {
          return 'Loading....';
        }
        return data.map(({
          _id: id,
          name,
        }) => (
          <Fab
            variant="extended"
            aria-label="Delete"
            className={classes.categoryButton}
            color={selected === id ? 'primary' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSelect(id);
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
  selected: undefined,
};

Categories.propTypes = {
  classes: PropTypes.shape().isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(Categories);
