import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from "@material-ui/core/styles/index";
import Websocket from 'react-websocket';
import {Redirect} from "react-router";
import UrlHelper from "../../../utilities/urlHelper";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 0.5,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            notifications: [],
            redirect: false
        };
        this.urlHelper = new UrlHelper();
    }

    handleData = (data) => {
        console.log(data);
        this.setState({count: this.state.count+1});
        this.state.notifications.push(JSON.parse(data));
        this.setState({notifications: this.state.notifications});
    };

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
                        <IconButton aria-label="4 pending messages" className={classes.margin}
                                    onClick={()=>this.setState({redirect: true})}>
                            {
                                (this.state.count > 0) ?
                                    <Badge badgeContent={this.state.count} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                    :
                                    <MailIcon />
                            }
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
                <Websocket url='ws://localhost:4567/notifications'
                           onMessage={this.handleData.bind(this)}/>
                {
                    this.state.redirect? <Redirect to={{pathname: `${this.urlHelper.owaPath()}/notifications`,
                     notifications: this.state.notifications}}/> : null
                }
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
