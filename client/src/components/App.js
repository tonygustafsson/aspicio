import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import OnlineServicesContainer from '../containers/OnlineServicesContainer';
import OfflineServicesContainer from '../containers/OfflineServicesContainer';
import ErrorsContainer from '../containers/ErrorsContainer';
import ConnectivityContainer from '../containers/ConnectivityContainer';
import Grid from '@material-ui/core/Grid';

const App = () => {
    return (
        <Grid container spacing={16}>
            <HeaderContainer />
            <ConnectivityContainer />
            <OfflineServicesContainer />
            <OnlineServicesContainer />
            <ErrorsContainer />
        </Grid>
    );
};

export default App;
