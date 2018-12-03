import { connect } from 'react-redux';
import { listenForNewData, listenForServiceStateResponse } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    dispatch(listenForNewData());
    dispatch(listenForServiceStateResponse());

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
