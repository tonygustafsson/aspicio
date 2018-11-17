import React from 'react';
import moment from 'moment';
import ServiceItemContainer from '../containers/ServiceItemContainer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const Services = ({ services, isLoading, heading }) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!services || services.length < 1) {
        return <div />;
    }

    return (
        <Paper>
            <GridList cellHeight={180}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{heading}</ListSubheader>
                </GridListTile>

                {services.map(service => (
                    <ServiceItemContainer key={service.id} service={service} modalIsOpen={false} />
                ))}
            </GridList>
        </Paper>
    );
};

export default withRoot(Services);
