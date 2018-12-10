import { connect } from 'react-redux';
import Services from '../components/Services';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        services: state.data && state.data.status && state.data.status.online ? state.data.status.online : [],
        heading: 'Online services'
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
