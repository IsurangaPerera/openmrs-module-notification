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
    state = {
      chipData: [
        { key: 0, label: 'John' },
        { key: 1, label: 'Oliver' },
        { key: 2, label: 'Henry' },
        { key: 3, label: 'Dean' },
        { key: 4, label: 'Sam' },
        { key: 5, label: 'Steve' },
      ],
    };

    handleDelete = data => () => {
      if (data.label === 'React') {
        alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
        return;
      }

      const chipData = [...this.state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      this.setState({ chipData });
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
};

export default withStyles(styles)(ChipsArray);
