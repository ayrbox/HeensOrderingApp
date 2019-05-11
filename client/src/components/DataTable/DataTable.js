import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ZoomIn from '@material-ui/icons/ZoomIn';

import ConfirmAction from '../ConfirmAction';

import styles from './styles';

const displayColumns = columns => columns.filter(({ hidden }) => !hidden);
const keyColumn = columns => columns.find(({ key }) => key);

const renderColumns = columns => (
  <TableHead>
    <TableRow>
      {columns.map(({ name, label }) => (<TableCell key={name}>{label}</TableCell>))}
      <TableCell />
    </TableRow>
  </TableHead>
);

const renderRow = (
  columns,
  row,
  keyCol,
  onView,
  onEdit,
  onDelete,
  classes,
) => {
  const { name: keyName } = keyCol;
  const id = row[keyName];
  return (
    <TableRow
      key={id}
    >
      {columns.map(({ name, render }) => (
        <TableCell key={name}>{(render) ? render(row[name], id) : row[name]}</TableCell>
      ))}
      <TableCell className={classes.actionCell}>
        {onView && (
          <IconButton
            aria-label="View"
            size="small"
            onClick={() => onView(id)}
          >
            <ZoomIn />
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            aria-label="Edit"
            size="small"
            onClick={() => onEdit(id)}
          >
            <EditIcon />
          </IconButton>
        )}
        {onDelete && (
          <ConfirmAction
            action={() => onDelete(id)}
            message="Are you sure you want to delete ?"
          >
            <IconButton
              aria-label="Delete"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </ConfirmAction>
        )}
      </TableCell>
    </TableRow>
  );
};

const DataTable = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  classes,
}) => {
  const cols = displayColumns(columns);
  const key = keyColumn(columns);
  return (
    <Table>
      {renderColumns(cols)}
      <TableBody>
        {data.map(row => renderRow(cols, row, key, onView, onEdit, onDelete, classes))}
      </TableBody>
    </Table>
  );
};

DataTable.defaultProps = {
  onEdit: undefined,
  onView: undefined,
  onDelete: undefined,
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DataTable);
