import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';

const initialState = {
    isLoading: true,
    hasError: false,
    data: []
};

const store = configureStore(initialState);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
