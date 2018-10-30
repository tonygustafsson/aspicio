import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose(
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
          )
        : compose(applyMiddleware(thunk));

    return createStore(rootReducer, initialState, composeEnhancers);
}
