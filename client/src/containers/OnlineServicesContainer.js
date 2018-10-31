import { connect } from 'react-redux';
import Services from '../components/Services';
import { itemsFetchData } from '../actions';

const mapStateToProps = state => {
    return {
        services: state.data && state.data.status && state.data.status.online ? state.data.status.online : [],
        isLoading: state.itemsAreLoading,
        heading: 'Online services'
    };
};

const mapDispatchToProps = dispatch => {
    dispatch(itemsFetchData());

    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
