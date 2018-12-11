import React from 'react';

import OnlineServicesContainer from '../containers/OnlineServicesContainer';
import OfflineServicesContainer from '../containers/OfflineServicesContainer';
import ErrorsContainer from '../containers/ErrorsContainer';
import ConnectivityContainer from '../containers/ConnectivityContainer';
import Grid from '@material-ui/core/Grid';

const App = () => {
    return (
        <Grid container spacing={16}>
            <ConnectivityContainer />
            <OfflineServicesContainer />
            <OnlineServicesContainer />
            <ErrorsContainer />
        </Grid>
    );
};

export default App;
