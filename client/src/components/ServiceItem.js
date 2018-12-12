import React from 'react';
import moment from 'moment';
import ServiceItemDialogContainer from '../containers/ServiceItemDialogContainer';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withRoot from '../withRoot';
import { withTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

let getTileStyle = (service, theme) => {
    return {
        width: 'calc(100% - 20px)',
        background: `url("img/services/${service.id}.svg") no-repeat`,
        backgroundSize: '50% 50%',
        backgroundPosition: 'center 25%',
        opacity: service.enabled ? 1 : 0.75,
        cursor: 'pointer'
    };
};

let getgridListTileBarStyle = service => {
    if (!service.enabled) return { backgroundColor: orange[700] };

    return {
        backgroundColor: service.serverIsUp ? green[700] : red[700]
    };
};

let getButtonStyle = {
    color: '#fff'
};

const ServiceItem = ({ service, modalIsOpen, toggleModal, theme }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <GridListTile onClick={toggleModal} key={service.id} style={getTileStyle(service, theme)}>
                <GridListTileBar
                    title={service.name + ' (' + service.requestTime + 'ms)'}
                    subtitle={<span>{moment(service.time).format('LLLL')}</span>}
                    style={getgridListTileBarStyle(service)}
                    actionIcon={
                        <IconButton>
                            <InfoIcon style={getButtonStyle} />
                        </IconButton>
                    }
                />
            </GridListTile>

            <ServiceItemDialogContainer service={service} modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
        </Grid>
    );
};

export default withRoot(withTheme()(ServiceItem));
