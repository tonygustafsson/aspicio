import { connect } from 'react-redux';
import Status from '../components/Status';
import { itemsFetchData } from '../actions';

const mapStateToProps = state => {
    return {
        data: state.data,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = dispatch => {
    dispatch(itemsFetchData());

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Status);
