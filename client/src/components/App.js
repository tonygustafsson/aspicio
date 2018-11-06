import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
