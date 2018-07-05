import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ChipsArray from './Chips';
import UrlHelper from "../../../utilities/urlHelper";
import axios from "axios";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
});

class Subscription extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.subscription = null;

        this.state = {
            uuid: this.subscription != null ? this.subscription.uuid : null,
            name: this.subscription != null ? this.subscription.name : '',
            description: this.subscription != null && this.subscription.description != null ? this.subscription.description : '',
            patients: this.props.location.patients,
            event: this.subscription != null ? this.subscription.uuid : "",
            events: []
        };

        this.state = (this.props.location.state === undefined)? this.state : JSON.parse(this.props.location.state);
        this.state.patients = this.props.location.patients;

        this.urlHelper = new UrlHelper();
    }

    saveSubscription = () => {
        let parameters = {};
        parameters.name = this.state.name;
        parameters.description = this.state.description;
        parameters.eventId = this.state.event;
        parameters.patients = {};
        const self = this;

        let  i = 0;
        this.state.patients.forEach((p) => {
            parameters.patients[i] = p.pid;
            i = i+1;
        });

        axios({
            method: 'post',
            url: this.urlHelper.apiBaseUrl() + "/notification",
            headers: {'Content-Type': 'application/json'},
            data: parameters
        })
            .then(function(response) {
                self.props.history.goBack();
                self.props.history.goBack();
            })
            .catch(function(errorResponse) {
                console.log(errorResponse);
            });
    };

    getEvents = () => {
        const self = this;
        axios
            .get(this.urlHelper.apiBaseUrl() + '/event')
            .then(function(response) {
                let events = [];
                response.data.results.forEach((event) => {
                    let e = {};
                    e.value = event.uuid;
                    e.label = event.name;
                    events.push(e);
                });
                self.setState({events:events});
            })
            .catch(function(errorResponse) {
                console.log(errorResponse);
            });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        this.newTo = {
            pathname: `${this.urlHelper.owaPath()}/edit`,
            state: JSON.stringify(this.state)
        };

        this.newFrom = {
            pathname: `${this.urlHelper.owaPath()}/index.html`,
            state: JSON.stringify(this.state)
        };

        if(this.state.events.length === 0) this.getEvents();
        const { classes } = this.props;
        return (
            <div id="body-wrapper" className="body-wrapper">
                <Paper className={classes.root}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid container spacing={24}>

                            <Grid item xs={4} />
                            <Grid item xs={4}>
                                <TextField fullWidth
                                           id="name"
                                           label="Name"
                                           className={classes.textField}
                                           value={this.state.name}
                                           onChange={this.handleChange('name')}
                                           margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4} />

                            <Grid item xs={4} />
                            <Grid item xs={4}>
                                <TextField fullWidth
                                           id="select-eventId"
                                           select
                                           label="Select Event"
                                           className={classes.textField}
                                           value={this.state.event}
                                           onChange={this.handleChange('event')}
                                           SelectProps={{
                                               MenuProps: {
                                                   className: classes.menu,
                                               },
                                           }}
                                           helperText="Please select the event"
                                           margin="normal"
                                >
                                    {this.state.events.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4} />

                            <Grid item xs={4} />
                            { (this.props.location.patients === undefined) ? <Grid item xs={4} /> :
                                <Grid item xs={4}>
                                    <ChipsArray
                                        chipData={() => {
                                            let data = [];
                                            let i = 0;
                                            this.state.patients.forEach((p) => {
                                                let obj = {};
                                                obj.key = i;
                                                obj.label = p.name;
                                                i = i + 1;
                                                data.push(obj);
                                            });
                                            return data;
                                        }}
                                    />
                                </Grid>
                            }
                            <Grid item xs={4} />

                            <Grid item xs={4} />
                            <Grid item xs={2}>
                                <Link
                                    to={this.newTo}>
                                    Add Patient(s)
                                </Link>
                            </Grid>
                            <Grid item xs={6} />

                            <Grid item xs={4} />
                            <Grid item xs={4}>
                                <TextField fullWidth
                                           multiline
                                           rowsMax="4"
                                           id="description"
                                           label="Description"
                                           className={classes.textField}
                                           value={this.state.description}
                                           onChange={this.handleChange('description')}
                                           margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4} />

                            <Grid item xs={6} />
                            <Grid item xs={1}>
                                <Button size="large" className={classes.button}>
                                    Close
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button size="large" variant="outlined" color="primary" className={classes.button} onClick={this.saveSubscription}>
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={4} />

                        </Grid>
                    </form>
                    <br/><br/>
                </Paper>
            </div>
        )
    }
}

Subscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subscription);
