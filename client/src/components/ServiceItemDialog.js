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

const ServiceItemDialog = ({ service, modalIsOpen, toggleModal, toggleServiceState }) => {
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
                    {service.enabled && <span>Enabled: YES</span>}
                    {!service.enabled && <span>Enabled: NO</span>}
                    <br />
                    {service.error && <span>Last error: {service.error}</span>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleServiceState(service.name)} color="secondary">
                    {service.enabled && <span>Pause service</span>}
                    {!service.enabled && <span>Start service</span>}
                </Button>
                <Button onClick={toggleModal} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRoot(ServiceItemDialog);
