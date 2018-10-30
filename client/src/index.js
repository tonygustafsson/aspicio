import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import MyComponent from './components/MyComponent';
import StatusContainer from './containers/StatusContainer';

const initialState = {
    isLoading: true,
    hasError: false,
    items: []
};

const store = configureStore(initialState);

render(
    <Provider store={store}>
        <div>
            <StatusContainer />
            <MyComponent />
        </div>
    </Provider>,
    document.getElementById('app')
);
