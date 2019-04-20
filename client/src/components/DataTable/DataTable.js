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
) => {
  const { name: keyName } = keyCol;
  const id = row[keyName];
  return (
    <TableRow>
      {columns.map(({ name }) => (
        <TableCell>{row[name]}</TableCell>
      ))}
      <TableCell>
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
          <IconButton
            aria-label="Delete"
            size="small"
            onClick={() => onDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
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
}) => {
  const cols = displayColumns(columns);
  const key = keyColumn(columns);
  return (
    <Table>
      {renderColumns(cols)}
      <TableBody>
        {data.map(row => renderRow(cols, row, key, onView, onEdit, onDelete))}
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
};

export default withStyles(styles)(DataTable);
