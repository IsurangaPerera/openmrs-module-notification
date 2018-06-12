import React from 'react';
import PropTypes from 'prop-types';

const contextPath = window.location.href.split('/')[3];

const View = props => (
    <div className="reg-header-wrapper header-wrapper">
        <header className="reg-header" >
            <ul className="top-nav fl">
                <a className="back-btn" accessKey="h" ><i className="fa fa-home"/></a>
                <li>
                    <a accessKey="e"><i className="fa-search fa fa-white small"/>
                        <span className="nav-link">S<u>e</u>arch</span></a>
                </li>
                <li >
                    <a accessKey="n"><i className="fa-plus fa fa-white small"/>
                        <span className="nav-link">Create <u>N</u>ew</span></a>
                </li>
            </ul>
            <div className="reg-header-right fr">
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

View.propTypes = {
    currentLocation: PropTypes.shape().isRequired,
    currentUser: PropTypes.string.isRequired,
    locations: PropTypes.array.isRequired,
    toggleState: PropTypes.func.isRequired,
    userDropdown: PropTypes.bool,
    locationDropdown: PropTypes.bool,
};

View.defaultProps = {
    userDropdown: false,
    locationDropdown: false,
};

export default View;
