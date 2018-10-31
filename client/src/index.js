import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import OnlineServicesContainer from './containers/OnlineServicesContainer';
import OfflineServicesContainer from './containers/OfflineServicesContainer';
import ErrorsContainer from './containers/ErrorsContainer';

const initialState = {
    isLoading: true,
    hasError: false,
    data: []
};

const store = configureStore(initialState);

render(
    <Provider store={store}>
        <div>
            <OfflineServicesContainer />
            <OnlineServicesContainer />
            <ErrorsContainer />
        </div>
    </Provider>,
    document.getElementById('app')
);
