import React from 'react';

import OnlineServicesContainer from '../containers/OnlineServicesContainer';
import OfflineServicesContainer from '../containers/OfflineServicesContainer';
import ErrorsContainer from '../containers/ErrorsContainer';
import ConnectivityContainer from '../containers/ConnectivityContainer';

const App = () => {
    return (
        <div>
            <ConnectivityContainer />
            <OfflineServicesContainer />
            <OnlineServicesContainer />
            <ErrorsContainer />
        </div>
    );
};

export default App;
