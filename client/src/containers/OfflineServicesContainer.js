// @flow

import { connect } from 'react-redux';
import Services from '../components/Services';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        services: state.data && state.data.status && state.data.status.offline ? state.data.status.offline : [],
        heading: 'Offline services'
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
