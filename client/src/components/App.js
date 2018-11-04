import React from 'react';
import OnlineServicesContainer from '../containers/OnlineServicesContainer';
import OfflineServicesContainer from '../containers/OfflineServicesContainer';
import ErrorsContainer from '../containers/ErrorsContainer';

const App = () => {
    return (
        <div>
            <OfflineServicesContainer />
            <OnlineServicesContainer />
            <ErrorsContainer />
        </div>
    );
};

export default App;
