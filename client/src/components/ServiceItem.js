import React from 'react';
import moment from 'moment';
import ServiceItemDialogContainer from '../containers/ServiceItemDialogContainer';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

let getTileStyle = service => {
    return {
        background: `url("img/services/${service.id}.svg") no-repeat`,
        backgroundSize: '50% 50%',
        backgroundPosition: 'center 25%',
        opacity: service.enabled ? 1 : 0.5
    };
};

const ServiceItem = ({ service, modalIsOpen, toggleModal }) => {
    return (
        <>
            <GridListTile key={service.id} style={getTileStyle(service)}>
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

            <ServiceItemDialogContainer service={service} modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
        </>
    );
};

export default withRoot(ServiceItem);
