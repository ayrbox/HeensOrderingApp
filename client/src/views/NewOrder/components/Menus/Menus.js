import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


import Fetch from '../../../../components/Fetch';
import styles from './styles';

const Menus = ({
  category,
  classes,
  setMenu,

}) => (
  <GridList
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
            const { _id: id, name, price } = menu;
            return (
              <GridListTile
                cols={1}
              >
                <Card
                  key={id}
                  className={classes.card}
                >
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenu(menu);
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="body1">
                        {name}
                        {' '}
                        <strong>{`£${price.toFixed(2)}`}</strong>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </GridListTile>
            );
          });
      }}
    </Fetch>
  </GridList>
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
