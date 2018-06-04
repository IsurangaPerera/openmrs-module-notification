import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const columnData = [
  {
    id: 'pid', numeric: false, disablePadding: true, label: 'ID',
  },
  {
    id: 'name', numeric: true, disablePadding: false, label: 'Name',
  },
  {
    id: 'gender', numeric: true, disablePadding: false, label: 'Gender',
  },
  {
    id: 'age', numeric: true, disablePadding: false, label: 'Age',
  },
  {
    id: 'reg', numeric: true, disablePadding: false, label: 'Registration Date',
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

class PatientTableHead extends React.Component {
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

PatientTableHead.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(PatientTableHead));