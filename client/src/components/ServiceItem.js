// @flow

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

const green = 'rgb(30, 74, 32)';
const red = 'rgb(128, 18, 18)';
const yellow = 'rgb(148, 127, 27)';

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
    if (!service.enabled) return { backgroundColor: yellow };

    return {
        backgroundColor: service.serverIsUp ? green : red
    };
};

let getButtonStyle = {
    color: '#fff'
};

type Props = {
    service: any,
    modalIsOpen: number,
    toggleModal: boolean,
    theme: any
};

const ServiceItem = ({ service, modalIsOpen, toggleModal, theme }: Props) => {
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
