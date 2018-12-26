// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
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
