import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';

const myCompose =
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose(
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
          )
        : compose(applyMiddleware(thunk));

const store = createStore(reducers, {}, myCompose);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer store={store} />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
