import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const Errors = ({ isAuthenticated, errors }) => {
    if (!isAuthenticated || !errors) {
        return <div />;
    }

    return (
        <Paper>
            <Typography component="h1" variant="h4" gutterBottom>
                Errors
            </Typography>

            <Table>
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
                            <TableRow key={error.time + Math.random()}>
                                <TableCell>{moment(error.time).format('LLLL')}</TableCell>
                                <TableCell>{error.name}</TableCell>
                                <TableCell>{error.url}</TableCell>
                                <TableCell>{error.message}</TableCell>
                                <TableCell>{error.requestTime}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withRoot(Errors);
