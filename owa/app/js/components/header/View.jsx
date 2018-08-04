import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 0.5,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

class View extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="reg-header-wrapper header-wrapper">
                <header className="reg-header" >
                    <ul className="top-nav fl">
                        <a className="back-btn" accessKey="h" ><i className="fa fa-home"/></a>
                        { (this.props.isActive === false) ? null :
                            <li >
                                <Link accessKey="n" to={this.props.createNewLink}>
                                    <i className="fa-plus fa fa-white small"/>
                                    <span className="nav-link">Create <u>N</u>ew</span>
                                </Link>
                            </li>
                        }
                    </ul>
                    <div className="reg-header-right fr">
                        <IconButton aria-label="4 pending messages" className={classes.margin}>
                            <Badge badgeContent={2} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <button className="btn-user-info fr">
                            <i className="fa fa-user-md fa-white small"/>
                            <i className="fa fa-caret-down fa-white mini"/>
                        </button>
                        <ul>
                            <li>
                                <a><i className="fa fa-user fa-white small"/><span>superman</span></a>
                            </li>
                            <li>
                                <i className="fa fa-map-marker fa-white small"/><span>General Ward</span>
                            </li>
                            <li>
                                <a><i className="fa fa-power-off fa-white small"/><span
                                    className="nav-link">Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}

View.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    createNewLink: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    userDropdown: PropTypes.bool,
    locationDropdown: PropTypes.bool,
};

View.defaultProps = {
    userDropdown: false,
    locationDropdown: false,
    isActive: false
};

export default withStyles(styles)(View);
