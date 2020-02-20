// @flow

import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import OnlineServicesContainer from '../containers/OnlineServicesContainer';
import OfflineServicesContainer from '../containers/OfflineServicesContainer';
import ErrorsContainer from '../containers/ErrorsContainer';
import ConnectivityContainer from '../containers/ConnectivityContainer';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <HeaderContainer />
                <ConnectivityContainer />
                <OfflineServicesContainer />
                <OnlineServicesContainer />
                <ErrorsContainer />
            </Grid>
        </ThemeProvider>
    );
};

export default App;
