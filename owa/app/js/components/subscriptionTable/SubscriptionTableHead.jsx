import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles/index";

const columnData = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Name',
  },
  {
    id: 'event-type', numeric: true, disablePadding: false, label: 'Event Type',
  },
  {
    id: 'active', numeric: true, disablePadding: false, label: 'Active',
  },
  {
    id: 'date-created', numeric: true, disablePadding: false, label: 'Date Created',
  },
  {
    id: 'action', numeric: true, disablePadding: false, label: '',
  },
];

const styles = theme => ({
  body: {
    fontSize: 13,
    fontFamily: [
      '"OpenSans"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

class SubscriptionTableHead extends React.Component {
    createSortHandler = property => (event) => {
      this.props.onRequestSort(event, property);
    };

    render() {
      const {
        classes, onSelectAllClick, order, orderBy, numSelected, rowCount,
      } = this.props;

      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
            {columnData.map(column => (
              <TableCell
                className={classes.body}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ), this)}
          </TableRow>
        </TableHead>
      );
    }
}

SubscriptionTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
};

const actionCreators = {
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(SubscriptionTableHead));