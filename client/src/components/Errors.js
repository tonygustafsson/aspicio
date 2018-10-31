import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let locale = require('moment/locale/sv');
moment.locale('sv', locale);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    td: {
        textAlign: 'left'
    }
});

const Errors = ({ errors, isLoading, classes }) => {
    if (!errors) {
        return <p>Yeay, no errors!</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>RequestTime (ms)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {errors.map(error => {
                        return (
                            <TableRow key={error.id}>
                                <TableCell className={classes.td}>{moment(error.time).format('LLLL')}</TableCell>
                                <TableCell className={classes.td}>{error.name}</TableCell>
                                <TableCell className={classes.td}>{error.url}</TableCell>
                                <TableCell className={classes.td}>{error.message}</TableCell>
                                <TableCell className={classes.td}>{error.requestTime}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(Errors);
