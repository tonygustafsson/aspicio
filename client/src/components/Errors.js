import React from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

let locale = require('moment/locale/sv');
moment.locale('sv', locale);

const Errors = ({ errors, isLoading }) => {
    if (!errors) {
        return <p>Yeay, no errors!</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="col-md-10 offset-md-1">
            <Table>
                <tr>
                    <td>Time</td>
                    <td>Service</td>
                    <td>URL</td>
                    <td>Message</td>
                    <td>RequestTime (ms)</td>
                </tr>
                {errors.map(error => {
                    return (
                        <tr key={error.id}>
                            <td>{moment(error.time).format('LLLL')}</td>
                            <td>{error.name}</td>
                            <td>{error.url}</td>
                            <td>{error.message}</td>
                            <td>{error.requestTime}</td>
                        </tr>
                    );
                })}
            </Table>
        </div>
    );
};

export default Errors;
