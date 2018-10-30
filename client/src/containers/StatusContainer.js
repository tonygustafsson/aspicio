import { connect } from 'react-redux';
import Status from '../components/Status';
import { itemsFetchData } from '../actions';

const mapStateToProps = state => {
    return {
        items: state.items,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = dispatch => {
    dispatch(itemsFetchData('http://localhost:3001/get-status'));

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Status);
