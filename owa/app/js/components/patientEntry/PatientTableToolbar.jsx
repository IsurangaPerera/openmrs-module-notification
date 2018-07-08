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
import SearchBar from 'material-ui-search-bar'
import PropTypes from 'prop-types';
import UrlHelper from "../../../utilities/urlHelper";

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

    constructor(props, context) {
        super(props, context);

        this.state = {
            searchTerm: ""
        };
    }

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
                        <SearchBar
                            value={this.state.searchTerm}
                            onChange={() => {}}
                            onRequestSearch={(e) => {this.props.handleOnSearch(e)}}
                        />
                    )}
                </div>
                <div className={this.props.classes.spacer} />
                <div className={this.props.classes.actions}>
                    {this.props.numSelected > 0 ? (
                        <Tooltip title="Add Patients">
                            <IconButton aria-label="Add Patients"
                                        onClick={()=>{this.props.handleAddPatients([], [])}}>
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
    handleAddPatients: PropTypes.func.isRequired,
    handleOnSearch: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(PatientTableToolbar);
