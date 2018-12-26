// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
import type { InitialStateType } from './types';

const initialState: InitialStateType = {
    isAuthenticated: false,
    isOnline: true,
    data: {}
};

const store = configureStore(initialState);
const appElement = document.getElementById('app');

if (document instanceof Document && appElement instanceof Element) {
    render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        appElement
    );
}

serviceWorker.register();
