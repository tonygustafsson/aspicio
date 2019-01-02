// @flow

import React from 'react';
import ServiceItemContainer from '../containers/ServiceItemContainer';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withRoot from '../withRoot';
import type { ServiceType } from '../types';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import WarningIcon from '@material-ui/icons/Warning';

const ServiceIconStyle = {
    width: 38,
    height: 38,
    marginRight: 10,
    verticalAlign: 'bottom'
};

const ArePropsEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps.services) === JSON.stringify(nextProps.services);
};

type PropTypes = {
    isAuthenticated: boolean,
    services: Array<ServiceType>,
    heading: string
};

const Services = ({ isAuthenticated, services, heading, type }: PropTypes) => {
    if (!isAuthenticated || !services || services.length < 1) {
        return <div />;
    }

    return (
        <Grid container>
            <Paper>
                <Typography component="h1" variant="h4" gutterBottom>
                    {type === 'online' && <CloudDoneIcon style={ServiceIconStyle} />}
                    {type === 'offline' && <WarningIcon style={ServiceIconStyle} />}
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

export default withRoot(React.memo(Services, ArePropsEqual));
