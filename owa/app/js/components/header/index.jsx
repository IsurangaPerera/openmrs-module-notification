import React from 'react';
import PropTypes from 'prop-types';
import View from './View';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDropdown: false,
            locationDropdown: false,
        };
    }

    componentWillMount() {
        /*this.props.fetchCurrentSession();
        this.props.fetchLocations();*/
    }

    toggleState = (key, value) => {
        this.setState(() => ({
            [key]: value || !this.state[key],
        }));
    };

    render() {
        return (
            <div>
                <View
                    isActive={this.props.isActive}
                    currentUser={this.props.currentUser}
                    createNewLink={this.props.createNewLink}
                />
            </div>
        );
    }
}

Header.propTypes = {
    currentUser: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    createNewLink: PropTypes.string
};

Header.defaultProps = {
    currentUser: '',
    isActive: false
};

export default Header;
