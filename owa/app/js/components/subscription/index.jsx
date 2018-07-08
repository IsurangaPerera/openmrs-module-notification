import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ChipsArray from './Chips';
import UrlHelper from "../../../utilities/urlHelper";
import axios from "axios";
import Header from "../header";
import PatientEntry from '../patientEntry';

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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Subscription extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.urlHelper = new UrlHelper();

        this.subscription = (this.props.location.subscription === undefined) ? null :
            this.props.location.subscription;

        this.state = {
            uuid: this.subscription != null ? this.subscription.uuid : null,
            name: this.subscription != null ? this.subscription.name : '',
            description: this.subscription != null && this.subscription.description != null ? this.subscription.description : '',
            patients: null,
            event: this.subscription != null ? this.subscription.event.uuid : "",
            isUpdate: this.subscription != null,
            events: [],
            open: false
        };
    }

    componentWillMount = () => {
        if(this.subscription != null){
            const self = this;
            this.getEvents();
            axios
                .get(`${this.urlHelper.apiBaseUrl()}/assignment?sId=${this.subscription.id}`)
                .then(function(response) {
                    let patients = [];
                    response.data.results.forEach((spa) => {
                        patients.push({pid:spa.patient.uuid, name:spa.patient.person.display});
                    });
                    self.setState({patients:patients});
                })
                .catch(function(errorResponse) {
                    console.log(errorResponse);
                });
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAddPatients = (selected, data) => {
        let selectedPatients = [];
        let s = selected.length;
        selected.forEach((i)=> {
            selectedPatients.push(data[i%s]);
        });
        this.setState({ patients: selectedPatients });
    };

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

        let path = `${this.urlHelper.apiBaseUrl()}/notification`;
        if(this.state.isUpdate) {
            path = `${path}/${this.state.uuid}`
        }

        axios({
            method: 'post',
            url: path,
            headers: {'Content-Type': 'application/json'},
            data: parameters
        })
            .then(function(response) {
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

    patientHandler = (e) => {
        this.setState({patients: this.state.patients.splice(e, 1)});
    };

    render() {
        if(this.state.events.length === 0) this.getEvents();
        const { classes } = this.props;
        return (
            <div>
                <Header/>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <PatientEntry
                        handleClose={this.handleClose}
                        handleAddPatients={this.handleAddPatients}
                    />
                </Dialog>

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
                                { (this.state.patients === null) ? <Grid item xs={4} /> :
                                    <Grid item xs={4}>
                                        <ChipsArray
                                            patientHandler={(e) => {this.patientHandler(e)}}
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
                                <Grid item xs={4}>
                                    <Button onClick={this.handleClickOpen}>Add Patient(s)</Button>
                                </Grid>
                                <Grid item xs={4} />

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
                                    <Button size="large" className={classes.button} onClick={this.props.history.goBack}>
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
            </div>
        )
    }
}

Subscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subscription);
