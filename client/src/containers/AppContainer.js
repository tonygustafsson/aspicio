// @flow

import { connect } from 'react-redux';
import { listenForNewData, listenForServiceStateResponse, listenToWindowEvent, navigatorOnLine, isAuthenticated } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    dispatch(isAuthenticated());

    dispatch(listenForNewData());
    dispatch(listenForServiceStateResponse());

    dispatch(listenToWindowEvent('offline', navigatorOnLine));
    dispatch(listenToWindowEvent('online', navigatorOnLine));

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
