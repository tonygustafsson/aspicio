import { connect } from 'react-redux';
import { listenForNewData, listenForServiceStateResponse, listenToWindowEvent, navigatorOnLine } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
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
