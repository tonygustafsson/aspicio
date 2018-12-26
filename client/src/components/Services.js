// @flow

import React from 'react';
import moment from 'moment';
import ServiceItemContainer from '../containers/ServiceItemContainer';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withRoot from '../withRoot';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const Services = ({ isAuthenticated, services, heading }) => {
    if (!isAuthenticated || !services || services.length < 1) {
        return <div />;
    }

    return (
        <Grid container>
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
        </Grid>
    );
};

export default withRoot(Services);
