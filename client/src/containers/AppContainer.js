import { connect } from 'react-redux';
import { itemsFetchData } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    dispatch(itemsFetchData());

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
