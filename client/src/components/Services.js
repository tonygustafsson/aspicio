import React from 'react';
import moment from 'moment';
import ServiceItemContainer from '../containers/ServiceItemContainer';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const Services = ({ services, heading }) => {
    if (!services || services.length < 1) {
        return <div />;
    }

    return (
        <Paper>
            <Typography component="h1" variant="h4" gutterBottom>
                {heading}
            </Typography>

            <GridList cellHeight={180}>
                {services.map(service => (
                    <ServiceItemContainer key={service.id} service={service} modalIsOpen={false} />
                ))}
            </GridList>
        </Paper>
    );
};

export default withRoot(Services);
