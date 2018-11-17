import React from 'react';
import moment from 'moment';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const ServiceItem = ({ service, modalIsOpen, toggleModal }) => {
    return (
        <>
            <GridListTile key={service.id}>
                <img src="img/server.png" alt={service.name} />
                <GridListTileBar
                    title={service.name + ' (' + service.requestTime + 'ms)'}
                    subtitle={<span>{moment(service.time).format('LLLL')}</span>}
                    actionIcon={
                        <IconButton onClick={toggleModal}>
                            <InfoIcon />
                        </IconButton>
                    }
                />
            </GridListTile>

            <Dialog open={modalIsOpen} onClose={toggleModal}>
                <DialogTitle>{service.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{service.description}</DialogContentText>
                    <DialogContentText>
                        URL: <a href="{service.url}">{service.url}</a>
                        <br />
                        Request time: {service.requestTime} ms
                        <br />
                        {service.error && <span>Last error: {service.error}</span>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="secondary">
                        Pause service
                    </Button>
                    <Button onClick={toggleModal} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default withRoot(ServiceItem);
