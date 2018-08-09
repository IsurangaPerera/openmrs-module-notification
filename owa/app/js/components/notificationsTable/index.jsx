import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import NotificationsTableHead from './NotificationsTableHead';
import NotificationsTableToolbar from './NotificationsTableToolbar';
import UrlHelper from '../../../utilities/urlHelper';
import Header from "../header";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
    },
    table: {
        minWidth: 400,
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

class NotificationsTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data: [].sort((a, b) => (a.name < b.name ? -1 : 1)),
            subscriptions: [],
            page: 0,
            rowsPerPage: 5,
        };

        this.urlHelper = new UrlHelper();
        this.counter = 0;
    }

    createData = (name, time, patient, op) => {
        this.counter += 1;
        return {
            id: this.counter, name, patient, op
        };
    };

    handleOnPageLoad = () => {
        let notifications = this.props.location.notifications;
        let n = [];
        notifications.forEach( (e) => {
            if(e.stopDatetime === null)
            n.push(
                this.createData(e.display, e.patient.display));
        });
        this.setState({data: n});
        console.log(notifications);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
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

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentDidMount = () => {
        this.handleOnPageLoad();
    };

    render() {
        const {classes} = this.props;
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (data.length - (page * rowsPerPage)));
        return (
            <div>
                <Header
                    isActive={true}
                    createNewLink={`${this.urlHelper.owaPath()}/subscription`}
                />
                <div id="body-wrapper" className="body-wrapper">
                    <Paper className={classes.root}>
                        <NotificationsTableToolbar numSelected={selected.length}/>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <NotificationsTableHead
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
                                                <TableCell padding="checkbox" className={classes.body}>
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none"
                                                           className={classes.body}>
                                                    {n.name}
                                                </TableCell>
                                                <TableCell numeric className={classes.body}>{n.patient}</TableCell>
                                                <TableCell numeric className={classes.body}>
                                                    <Link
                                                        to={{
                                                            pathname: `${this.urlHelper.owaPath()}/subscription`,
                                                            subscription: this.state.subscriptions[n.id-1]
                                                        }}>
                                                        Edit
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
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

NotificationsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsTable);
