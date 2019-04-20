import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ZoomIn from '@material-ui/icons/ZoomIn';

import MainLayout from '../viewcomponents/MainLayout';
import { getCategories } from '../../actions/categoryActions';
import styles from './styles';


class Categories extends Component {
  componentDidMount() {
    const { getCategories: handleGetCategories } = this.props;
    handleGetCategories();
  }

  render() {
    const { categories, classes } = this.props;
    const { loading, list } = categories;

    let listContent;
    if (loading) {
      listContent = <p>Loading..... </p>;
    } else {
      listContent = (
        <Table className="table table-striped">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell className={classes.actionCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ _id: id, name, description }) => (
              <TableRow
                key={id}
                hover
              >
                <TableCell>
                  <Link to={`/categories/${id}`}>
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{description}</TableCell>
                <TableCell className={classes.actionCell}>
                  <IconButton
                    aria-label="Delete"
                    size="small"
                    component={Link}
                    to={`/categories/${id}`}
                  >
                    <ZoomIn />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    size="small"
                    component={Link}
                    to={`/categories/${id}/edit`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    size="small"
                    component={Link}
                    to={`/categories/${id}/delete`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return (
      <MainLayout>
        <div className={classes.contentWrapper}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="title">
                Menu Categories
              </Typography>
              <Typography variant="subheading">
                List of menu categories
              </Typography>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                size="small"
                component={Link}
                to={{
                  pathname: '/categories/add',
                  state: { modal: true },
                }}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          {listContent}
        </div>
      </MainLayout>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    })),
    current: PropTypes.shape(),
    msg: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps, {
    getCategories,
  },
)(withStyles(styles)(Categories));
