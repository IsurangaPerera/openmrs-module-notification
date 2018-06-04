import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
        theme.palette.type === 'light'
          ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
          : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class PatientTableToolbar extends React.Component {
  render() {
    return (
      <Toolbar
        className={classNames(this.props.classes.root, {
          [this.props.classes.highlight]: this.props.numSelected > 0,
        })}
      >
        <div className={this.props.classes.title}>
          {this.props.numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {this.props.numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
                            Notification Subscriptions
            </Typography>
          )}
        </div>
        <div className={this.props.classes.spacer} />
        <div className={this.props.classes.actions}>
          {this.props.numSelected > 0 ? (
            <Tooltip title="Add Patients">
              <IconButton aria-label="Add Patients">
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter Patients">
              <IconButton aria-label="Filter Patients">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

PatientTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
};

const actionCreators = {
};

export default connect(mapStateToProps, actionCreators)(withStyles(toolbarStyles)(PatientTableToolbar));
