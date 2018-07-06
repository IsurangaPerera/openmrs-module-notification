import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class ChipsArray extends React.Component {
    constructor(props, context) {
        super(props, context);
        let chipData = this.props.chipData();
        this.state = {
            chipData: (chipData === undefined)? [] : chipData,
        };
    }


    handleDelete = data => () => {
        const chipData = this.state.chipData;
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({ chipData });
        this.props.patientHandler(chipToDelete);
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {this.state.chipData.map(data => (
                    <Chip
                        key={data.key}
                        avatar={null}
                        label={data.label}
                        onDelete={this.handleDelete(data)}
                        className={classes.chip}
                    />
                ))}
            </Paper>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
    chipData: PropTypes.func.isRequired,
    patientHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(ChipsArray);
