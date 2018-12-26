// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import type { InitialStateType } from '../types';

export default function configureStore(initialState: InitialStateType) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose(
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
          )
        : compose(applyMiddleware(thunk));

    return createStore(rootReducer, initialState, composeEnhancers);
}
