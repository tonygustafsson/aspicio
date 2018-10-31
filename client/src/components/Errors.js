import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

let locale = require('moment/locale/sv');
moment.locale('sv', locale);

const styles = theme => ({});

const Errors = ({ errors, isLoading, classes }) => {
    if (!errors) {
        return <p>Yeay, no errors!</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <table>
            {errors.map(error => (
                <tr>
                    <td>
                        {moment(error.time).format('LLLL')}: {error.message}
                    </td>
                </tr>
            ))}
        </table>
    );
};

export default withStyles(styles)(Errors);
