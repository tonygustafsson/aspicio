import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const ServiceItemDialog = ({ service, modalIsOpen, toggleModal }) => {
    return (
        <Dialog open={modalIsOpen} onClose={toggleModal}>
            <DialogTitle>{service.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{service.description}</DialogContentText>
                <DialogContentText>
                    URL: <a href="{service.url}">{service.url}</a>
                    <br />
                    Request time: {service.requestTime} ms
                    <br />
                    Last checked: {moment(service.time).format('LLLL')}
                    <br />
                    {service.error && <span>Last error: {service.error}</span>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleModal} color="secondary">
                    Pause service
                </Button>
                <Button onClick={toggleModal} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRoot(ServiceItemDialog);
