// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import type { InitialStateType } from '../types';

const initialState: InitialStateType = {
    isAuthenticated: false,
    isOnline: true,
    status: {
        online: [],
        offline: []
    },
    errors: []
};

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose(
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
          )
        : compose(applyMiddleware(thunk));

    return createStore(rootReducer, initialState, composeEnhancers);
}
