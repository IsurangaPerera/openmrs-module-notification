import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import PatientTableToolbar from "./PatientTableToolbar";
import PatientTableHead from "./PatientTableHead";
import UrlHelper from "../../../utilities/urlHelper";
import {Redirect} from "react-router-dom";
import Header from "../header";

let counter = 0;
function createData(pid, name, gender, age, reg) {
    counter += 1;
    return {
        id: counter, pid, name, gender, age, reg,
    };
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    body: {
        fontSize: 13,
        fontFamily: [
            '"OpenSans"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

class PatientTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data: [],
            selectedPatients: [],
            page: 0,
            rowsPerPage: 5,
            toSubscription: false
        };
        this.urlHelper = new UrlHelper();
    }

    handleOnSearch = (e) => {
        const self = this;
        let searchTerm = (e.match(/\S+/g) || []).join('+');
        if(searchTerm === "") return;
        axios
            .get(this.urlHelper.apiBaseUrl() + '/patient', {
                params: {
                    q: searchTerm,
                    v: 'full'
                }
            })
            .then(function(response) {
                let patients = [];
                response.data.results.forEach((patient) => {
                    patients.push(
                        createData(patient.uuid, patient.person.display, patient.person.gender,
                            patient.person.age, patient.auditInfo.dateCreated)
                    );
                });
                self.setState({data:patients});
            })
            .catch(function(errorResponse) {
                //const error = errorResponse.response.data ? errorResponse.response.data.error : errorResponse;
                console.log(errorResponse);
            });
    };

    handleAddPatients = (e) => {
        let selectedPatients = [];
        let s = this.state.selected.length;
        this.state.selected.forEach((i)=> {
            selectedPatients.push(this.state.data[i%s]);
        });
        this.setState({ selectedPatients: selectedPatients });
        this.setState({ toSubscription: true });
    };

    handleRequestSort = (event, property) => {

        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        let data = [];
        try {
            data =
                order === 'desc'
                    ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
        } catch (e) {
            console.log(e);
        }

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const newTo = {
            pathname: `${this.urlHelper.owaPath()}/subscription`,
            state: this.props.location.state,
            patients: this.state.selectedPatients
        };

        if (this.state.toSubscription === true) {
            return <Redirect to={newTo} />
        }
        const { classes } = this.props;
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (data.length - (page * rowsPerPage)));

        return (
            <div>
                <Header/>
                <div id="body-wrapper" className="body-wrapper">
                    <Paper className={classes.root}>
                        <PatientTableToolbar
                            handleAddPatients={this.handleAddPatients}
                            handleOnSearch={this.handleOnSearch}
                            numSelected={selected.length}
                        />
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <PatientTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {data.slice(page * rowsPerPage, ((page * rowsPerPage) + rowsPerPage)).map((n) => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none" className={classes.body}>
                                                    {n.pid}
                                                </TableCell>
                                                <TableCell numeric className={classes.body}>{n.name}</TableCell>
                                                <TableCell numeric className={classes.body}>{n.gender}</TableCell>
                                                <TableCell numeric className={classes.body}>{n.age}</TableCell>
                                                <TableCell numeric className={classes.body}>{n.reg}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

PatientTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientTable);
